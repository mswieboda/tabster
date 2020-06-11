require "./adapters/*"

module Tabster::Mailers
  class Mailer
    ADAPTER      = Adapters::SendInBlue
    FAKE_ADAPTER = Adapters::Faker

    getter name : String
    getter email : String
    getter message : String
    getter subject : String
    getter from_name : String
    getter from_email : String

    def initialize(@name, @email, @message, @subject, from_name = nil, from_email = nil)
      @from_name = from_name || "Tabster"
      @from_email = from_name || "info@tabster.herokuapp.com"
    end

    def deliver
      adapter = Crystal.env.production? ? ADAPTER : FAKE_ADAPTER
      puts ">>> Mailers::Mailer#deliver"
      puts "> adapter: #{adapter}"
      adapter.new(self).deliver
    end
  end
end
