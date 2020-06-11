require "./mailer"

module Tabster::Mailers
  class ResetPassword < Mailer
    def initialize(name, email, app_root, reset_password_uri)
      message = <<-EOM
      <div>
        <p>#{name},</p>
        <br/>
        <p>
          Please reset your password with this link:
        </p>
        <p>
          <a href="#{app_root}/#{reset_password_uri}">reset password</a>
        </p>
        <br/>
        <p>- <a href="#{app_root}">Tabster</p>
      </div>
      EOM

      super(
        name: name,
        email: email,
        subject: "Password Reset",
        message: message,
      )
    end
  end
end
