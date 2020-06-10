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
    email_confirmation_token: {type: String, default: generate_email_confirmation_token},
    email_confirmed: {type: Bool, default: false},
    username: String,
    password_digest: {type: String, default: ""},
    password: Password,
    password_confirmation: {type: String?, virtual: true},
    created_at: Time?,
    updated_at: Time?,
  )

  validates_uniqueness :email, :username

  after_create :send_email_confirmation

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

  def generate_email_confirmation_token
    @email_confirmation_token = Random::Secure.urlsafe_base64.to_s
  end

  def send_email_confirmation
    # TODO: disabled for now until link is in place, and turned off for development environment
    # puts ">>>>> sending email confirmation"
    # ConfirmationMailer.new(name: username, email: email, token: email_confirmation_token).deliver
  end

  def to_json(json : JSON::Builder)
    json.object do
      json.field "id", id
      json.field "email", email
      json.field "username", username
    end
  end
end
