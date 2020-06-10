require "./mailer"

module Tabster
  class ConfirmationMailer < Mailer
    def initialize(name, email, token)
      super(
        name: name,
        email: email,
        message: "<div><p>Hello #{name},</p><br/><p>Please confirm your email address.</p><p>Token:</p><p>#{token}</p><br/><p>Thanks,</p><p>Tabster</p></div>",
        subject: "Email Confirmation"
      )
    end
  end
end
