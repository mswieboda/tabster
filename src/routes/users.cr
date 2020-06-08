module Tabster
  before_all "/api/user" { |env| set_content_type_json(env) }
  before_all "/api/sign_up" { |env| set_content_type_json(env) }
  before_all "/api/sign_in" { |env| set_content_type_json(env) }
  before_all "/api/sign_out" { |env| set_content_type_json(env) }

  get "/api/user" do |env|
    auth_cookie = env.request.cookies["auth"]?

    if auth_cookie
      user = User.get?(auth_cookie.value)

      if user
        sign_in(env, user)

        user.to_json
      else
        response = {status_code: 401, message: "Invalid credentials"}
        halt env, status_code: 401, response: response
      end
    else
      response = {status_code: 401, message: "Not signed in"}
      halt env, status_code: 401, response: response
    end
  end

  post "/api/sign_up" do |env|
    email = env.params.json["email"].as(String | Nil)
    username = env.params.json["username"].as(String | Nil)
    password = env.params.json["password"].as(String | Nil)

    if email && username && password
      user = User.create({
        email:    email,
        username: username,
        password: password,
      })

      sign_in(env, user)

      user.to_json
    else
      response = {status_code: 422, message: "Email, Username, and Password required"}.to_json
      halt env, status_code: 422, response: response
    end
  end

  post "/api/sign_in" do |env|
    username_or_email = env.params.json["username"].as(String | Nil)
    password = env.params.json["password"].as(String | Nil)

    if username_or_email && password
      user = User.all.where { (_username == username_or_email) |
        (_email == username_or_email) &
          (_password == password) }.first

      if user
        sign_in(env, user)

        user.to_json
      else
        response = {status_code: 401, message: "Invalid"}
        halt env, status_code: 401, response: response
      end
    else
      response = {status_code: 422, message: "Email/Username, and Password required"}.to_json
      halt env, status_code: 422, response: response
    end
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
end
