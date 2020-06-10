require "./mailer"

module Tabster::Mailers
  class Confirmation < Mailer
    def initialize(name, email, confirm_uri)
      message = <<-EOM
      <div>
        <p>Hello #{name},</p>
        <br/>
        <p>
          Please confirm your email address with this link:
          <a href="#{confirm_uri}">Tabster new user confirmation</a>
        </p>
        <br/>
        <p>Thanks,</p>
        <p>Tabster</p>
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
