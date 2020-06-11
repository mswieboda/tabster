require "http/client"

module Tabster::Mailers::Adapters
  class SendInBlue
    class Config
      property api_url = "https://api.sendinblue.com/v3"
      property api_key = ""

      def initialize
      end
    end

    def self.config
      @@config ||= Config.new
    end

    def self.config(&block)
      yield config
    end

    getter mailer : Mailer

    def initialize(@mailer)
    end

    def deliver
      puts ">>> Adapters::SendInBlue#deliver"
      puts ">>> api_url: #{self.class.config.api_url}"
      puts ">>> api_key: #{self.class.config.api_key}"

      uri = URI.parse("#{self.class.config.api_url}/smtp/email")
      body = {
        sender: {
          name:  @mailer.from_name,
          email: @mailer.from_email,
        },
        to:          [{name: @mailer.name, email: @mailer.email}],
        htmlContent: @mailer.message,
        subject:     @mailer.subject,
      }.to_json

      response = HTTP::Client.post(
        uri,
        headers: HTTP::Headers{
          "accept"       => "application/json",
          "content-type" => "application/json",
          "api-key"      => self.class.config.api_key,
        },
        body: body
      )

      if response.success?
        response.body
      else
        response.status_message
      end
    end
  end
end
