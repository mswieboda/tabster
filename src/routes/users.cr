module Tabster
  before_all "/api/sign_up" { |env| set_content_type_json(env) }
  before_all "/api/sign_in" { |env| set_content_type_json(env) }

  post "/api/sign_up" do |env|
    email = env.params.json["email"].as(String | Nil)
    username = env.params.json["username"].as(String | Nil)
    password = env.params.json["password"].as(String | Nil)

    if email && username && password
      "New user created!"
      {email: email, username: username}.to_json
    else
      response = {status_code: 422, message: "Email, Username, and Password required"}.to_json
      halt env, status_code: 422, response: response
    end
  end

  post "/api/sign_in" do |env|
    username_or_email = env.params.json["username"].as(String | Nil)
    password = env.params.json["password"].as(String | Nil)

    if username_or_email && password
      {email: username_or_email, username: username_or_email}.to_json
    else
      response = {status_code: 422, message: "Email/Username, and Password required"}.to_json
      halt env, status_code: 422, response: response
    end
  end

  get "/api/user" do |env|
    {email: "user@email.com", username: "username"}.to_json
  end
end
