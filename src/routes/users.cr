module Tabster
  before_all "/api/user" { |env| set_content_type_json(env) }
  before_all "/api/sign_up" { |env| set_content_type_json(env) }
  before_all "/api/sign_in" { |env| set_content_type_json(env) }
  before_all "/api/sign_out" { |env| set_content_type_json(env) }

  get "/api/user" do |env|
    current_user(env).to_json
  rescue ex : ServerError
    options = halt_options(ex)
    halt env, status_code: options[:status_code], response: options[:response]
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

      sign_in(env, user)

      user.to_json
    else
      raise ValidationError.new("Email, Username, and Password required")
    end
  rescue ex : Jennifer::RecordInvalid
    raise ValidationError.new(ex.message)
  rescue ex : ServerError
    options = halt_options(ex)
    halt env, status_code: options[:status_code], response: options[:response]
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
          raise AuthError.new("Invalid credentials")
        end

        if authorized
          sign_in(env, user)

          next user.to_json
        end
      end
    end

    raise AuthError.new("Invalid credentials")
  rescue ex : ServerError
    options = halt_options(ex)
    halt env, status_code: options[:status_code], response: options[:response]
  end

  delete "/api/sign_out" do |env|
    sign_out(env)
    {status_code: 200}.to_json
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
        raise AuthError.new("Invalid credentials")
      end
    else
      raise AuthError.new("Not authorized")
    end
  end

  def self.halt_options(status_code = 200, message = nil)
    response = {status_code: status_code, message: message}.to_json
    {status_code: status_code, response: response}
  end

  def self.halt_options(ex : ServerError)
    halt_options(status_code: ex.status_code, message: ex.message)
  end

  class ServerError < Exception
    getter status_code

    def initialize(message)
      super(message)
      @status_code = 500
    end
  end

  class AuthError < ServerError
    def initialize(message)
      super(message)
      @status_code = 401
    end
  end

  class ValidationError < ServerError
    def initialize(message)
      super(message)
      @status_code = 422
    end
  end
end
