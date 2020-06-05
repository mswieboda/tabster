require "jennifer"
require "jennifer/adapter/postgres"

APP_ENV = ENV["APP_ENV"]? || "development"
Jennifer::Config.read("config/database.yml", APP_ENV)
Jennifer::Config.from_uri(ENV["DATABASE_URL"]) if ENV.has_key?("DATABASE_URL")

Jennifer::Config.configure do |conf|
  conf.logger.level = APP_ENV == "development" ? Log::Severity::Debug : Log::Severity::Error
end
