require "jwt"
require "jennifer/model/authentication"
require "../mailers/*"

class Tabster::User < Jennifer::Model::Base
  ANONYMOUS_USERNAME = "anonymous"

  table_name :users

  include Jennifer::Model::Authentication

  with_authentication
  with_timestamps

  mapping(
    id: Primary32,
    email: String,
    email_confirmation_token: {type: String, default: User.generate_email_confirmation_token},
    email_confirmed_at: Time?,
    username: String,
    password_digest: {type: String, default: ""},
    password: Password,
    password_confirmation: {type: String?, virtual: true},
    created_at: Time?,
    updated_at: Time?,
  )

  validates_uniqueness :email, :username

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

  def self.generate_email_confirmation_token
    Random::Secure.urlsafe_base64.to_s
  end

  def email_confirm!
    update!(email_confirmed_at: Time.utc)
  end

  def email_confirmed?
    !!email_confirmed_at
  end

  def email_confirm_uri
    "user/confirm?email=#{email}&token=#{email_confirmation_token}"
  end

  def reset_password_uri
    "user/reset_password?email=#{email}&token=#{email_confirmation_token}"
  end

  def send_email_confirmation(app_root)
    Mailers::Confirmation.new(
      name: username,
      email: email,
      app_root: "#{app_root}",
      email_confirm_uri: email_confirm_uri
    ).deliver
  end

  def send_reset_password(app_root)
    Mailers::ResetPassword.new(
      name: username,
      email: email,
      app_root: "#{app_root}",
      reset_password_uri: reset_password_uri
    ).deliver
  end

  def to_json(json : JSON::Builder)
    json.object do
      json.field "email", email
      json.field "username", username
      json.field "email_confirmation_token", email_confirmation_token
      json.field "email_confirmed", email_confirmed?
    end
  end
end
