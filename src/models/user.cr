require "jwt"
require "jennifer/model/authentication"
require "../mailers/confirmation_mailer"

class Tabster::User < Jennifer::Model::Base
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
    "users/confirm?email=#{email}&token=#{email_confirmation_token}"
  end

  def send_email_confirmation(env)
    # TODO: disabled for now until turned off for development environment
    return if email != "mswiebod@gmail.com"

    app_root = env.request.host_with_port

    puts ">>> sending email confirmation to: #{email}"

    ConfirmationMailer.new(
      name: username,
      email: email,
      confirm_uri: "#{app_root}/#{email_confirm_uri}"
    ).deliver
  end

  def to_json(json : JSON::Builder)
    json.object do
      json.field "id", id
      json.field "email", email
      json.field "username", username
      json.field "email_confirmed", email_confirmed?
    end
  end
end
