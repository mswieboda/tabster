require "http/client"

module Tabster
  class Mailer
    getter name : String?
    getter email : String
    getter message : String
    getter subject : String
    getter from_name : String?
    getter from_email : String?

    def initialize(@name, @email, @message, @subject, @from_name = nil, @from_email = nil)
    end

    def deliver
      uri = URI.parse("https://api.sendinblue.com/v3/smtp/email")
      body = {
        sender: {
          name:  from_name || "Tabster",
          email: from_email || "info@tabster.herokuapp.com",
        },
        to:          [{name: name, email: email}],
        htmlContent: message,
        subject:     subject,
      }.to_json
      response = HTTP::Client.post(
        uri,
        headers: HTTP::Headers{
          "accept"       => "application/json",
          "content-type" => "application/json",
          "api-key"      => "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",
        },
        body: body
      )

      puts ">>> send_email response:"
      puts "> status_code: #{response.status_code}"
      puts "> status_message: #{response.status_message}"
      puts "> success?: #{response.success?}"
      puts "> body: #{response.body}"
    end
  end
end
