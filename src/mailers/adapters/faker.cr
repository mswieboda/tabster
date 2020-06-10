module Tabster::Mailers::Adapters
  class Faker
    getter mailer : Mailer

    def initialize(@mailer)
    end

    def deliver
      puts ">>> Mailers::Faker.deliver message"
      puts "> from: #{@mailer.from_name} <#{@mailer.from_email}>"
      puts "> to: #{@mailer.name} <#{@mailer.email}>"
      puts "> subject: #{@mailer.subject}"
      puts "> message: #{@mailer.message}"
      puts "<<< Mailers::Faker.deliver message"

      "success"
    end
  end
end
