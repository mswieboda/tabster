require "./mailer"

module Tabster
  class ConfirmationMailer < Mailer
    def initialize(name, email, confirm_uri)
      super(
        name: name,
        email: email,
        message: "<div><p>Hello #{name},</p><br/><p>Please confirm your email address with this link: <a href=\"\">Tabster new user confirmation</a></p><br/><p>Thanks,</p><p>Tabster</p></div>",
        subject: "Email Confirmation"
      )
    end
  end
end
