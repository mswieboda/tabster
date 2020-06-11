require "jennifer"
require "jennifer/adapter/postgres"

Jennifer::Config.read("config/database.yml", Crystal.env.name)
Jennifer::Config.from_uri(ENV["DATABASE_URL"]) if ENV["DATABASE_URL"]?

Jennifer::Config.configure do |conf|
  conf.logger.level = Crystal.env.development? ? Log::Severity::Debug : Log::Severity::Error
end
