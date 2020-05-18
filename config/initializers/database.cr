require "jennifer"
require "jennifer/adapter/postgres"

Jennifer::Config.read("config/database.yml", ENV["APP_ENV"]? || "development")
Jennifer::Config.from_uri(ENV["DATABASE_URI"]) if ENV.has_key?("DATABASE_URI")

Jennifer::Config.configure do |conf|
  conf.logger.level = Logger::DEBUG
end
