require "./mailer"

module Tabster::Mailers
  class Confirmation < Mailer
    def initialize(name, email, app_root, email_confirm_uri)
      message = <<-EOM
      <div>
        <p>#{name},</p>
        <br/>
        <p>
          Please confirm your email address with this link:
        </p>
        <p>
          <a href="#{app_root}/#{email_confirm_uri}">email confirmation</a>
        </p>
        <br/>
        <p>- <a href="#{app_root}">Tabster</p>
      </div>
      EOM

      super(
        name: name,
        email: email,
        subject: "Email Confirmation",
        message: message,
      )
    end
  end
end
