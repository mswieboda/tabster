require "jwt"

class User < Jennifer::Model::Base
  with_timestamps

  mapping(
    id: Primary32,
    email: String,
    username: String,
    password: String,
    created_at: Time?,
    updated_at: Time?,
  )

  def auth_token
    payload = {"id" => id, "email" => email, "username" => username}
    JWT.encode(payload, "SecretKey", JWT::Algorithm::HS256)
  end

  def self.get?(auth_token)
    payload, _header = JWT.decode(auth_token, "SecretKey", JWT::Algorithm::HS256)
    id = payload && payload["id"]

    if id
      User.all.where { _id == id }.first
    end
  end

  def to_json(json : JSON::Builder)
    json.object do
      json.field "id", id
      json.field "email", email
      json.field "username", username
    end
  end
end
