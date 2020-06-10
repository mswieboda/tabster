require "../../src/mailers/adapters/send_in_blue"

Tabster::Mailers::Adapters::SendInBlue.config do |config|
  config.api_key = ENV["SEND_IN_BLUE_API_KEY"] if ENV["SEND_IN_BLUE_API_KEY"]?
end
