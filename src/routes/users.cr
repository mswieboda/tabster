module Tabster
  before_all "/api/user*" { |env| set_content_type_json(env) }
  before_all "/api/sign_up" { |env| set_content_type_json(env) }
  before_all "/api/sign_in" { |env| set_content_type_json(env) }
  before_all "/api/sign_out" { |env| set_content_type_json(env) }

  get "/api/user" do |env|
    current_user(env).to_json
  end

  post "/api/sign_up" do |env|
    email = env.params.json["email"].as(String | Nil)
    username = env.params.json["username"].as(String | Nil)
    password = env.params.json["password"].as(String | Nil)

    if email && username && password
      user = User.build({
        email:    email,
        username: username,
      })
      user.password = password
      user.save!

      user.send_email_confirmation(env)

      {status_code: 201, message: "User created"}.to_json
    else
      raise ValidationError.new(env, "Email, Username, and Password required")
    end
  rescue ex : Jennifer::RecordInvalid
    raise ValidationError.new(env, ex.message)
  end

  post "/api/sign_in" do |env|
    username_or_email = env.params.json["username"].as(String | Nil)
    password = env.params.json["password"].as(String | Nil)

    if username_or_email && password
      user = User.all
        .where { or(_username == username_or_email, _email == username_or_email) }
        .first

      if user
        begin
          authorized = user.authenticate(password)
        rescue ex : Crypto::Bcrypt::Error
          raise AuthError.new(env, "Invalid credentials")
        end

        if authorized
          if user.email_confirmed_at
            sign_in(env, user)

            next user.to_json
          else
            raise AuthError.new(env, "Unconfirmed email")
          end
        end
      end
    end

    raise AuthError.new(env, "Invalid credentials")
  end

  delete "/api/sign_out" do |env|
    sign_out(env)
    {status_code: 200}.to_json
  end

  get "/user/confirm" do |env|
    email = env.params.query["email"]?
    token = env.params.query["token"]?

    if email && token
      user = User.all
        .where { and(_email == email, _email_confirmation_token == token) }
        .first

      if user
        user.email_confirm!
        user.reload

        sign_in(env, user)

        next env.redirect "/"
      end
    else
      # TODO: redirect to React error page
      raise ValidationError.new(env, "Email and token required")
    end

    # TODO: redirect to React error page
    raise AuthError.new(env, "Invalid credentials")
  end

  post "/api/user/new_confirmation_email" do |env|
    email = env.params.json["email"]?

    if email
      user = User.all
        .where { _email == email.as(String) }
        .first

      if user
        user.update!({email_confirmation_token: User.generate_email_confirmation_token})
        user.send_email_confirmation(app_root(env))
      end
    else
      raise ValidationError.new(env, "Email required")
    end

    {status_code: 200}.to_json
  end

  post "/api/user/send_forgot_password" do |env|
    email = env.params.json["email"]?

    if email
      user = User.all
        .where { _email == email.as(String) }
        .first

      if user
        user.update!({email_confirmation_token: User.generate_email_confirmation_token})
        user.send_reset_password(app_root(env))
      end
    else
      raise ValidationError.new(env, "Email required")
    end

    {status_code: 200}.to_json
  end

  get "/user/reset-password" do |env|
    email = env.params.query["email"]?
    token = env.params.query["token"]?

    if email && token
      user = User.all
        .where { and(_email == email, _email_confirmation_token == token) }
        .first

      if user
        next serve_react(env)
      end
    else
      # TODO: redirect to React error page
      raise ValidationError.new(env, "Email and token required")
    end

    # TODO: redirect to React error page
    raise AuthError.new(env, "Invalid credentials")
  end

  post "/api/user/reset_password" do |env|
    email = env.params.json["email"]?
    token = env.params.json["token"]?
    password = env.params.json["password"]?

    if email && token && password
      user = User.all
        .where { and(_email == email.to_s, _email_confirmation_token == token.to_s) }
        .first

      if user
        user.update!({email_confirmation_token: User.generate_email_confirmation_token})
        user.password = password.to_s
        user.save!

        sign_in(env, user)

        next user.to_json
      end
    end

    raise AuthError.new(env, "Invalid credentials")
  end

  def self.sign_in(env, user)
    # TODO: add `secure: true` after HTTPS implemented
    auth_cookie = HTTP::Cookie.new(
      name: "auth",
      value: user.auth_token,
      http_only: true,
    )

    env.response.cookies << auth_cookie
  end

  def self.sign_out(env)
    auth_cookie = env.request.cookies["auth"]?

    if auth_cookie
      auth_cookie.expires = Time.unix(0)

      env.response.cookies << auth_cookie
    end
  end

  def self.current_user(env)
    auth_cookie = env.request.cookies["auth"]?

    if auth_cookie
      user = User.get?(auth_cookie.value)

      if user
        sign_in(env, user)

        user
      else
        raise AuthError.new(env, "Invalid credentials")
      end
    else
      raise AuthError.new(env, "Not authorized")
    end
  end

  def self.app_root(env)
    # TODO: needs to change to https with SSL enabled,
    # or figure out to determine protocol dynamically
    "http://#{env.request.host_with_port}"
  end
end
