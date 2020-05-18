# require "sam"

# here load jennifer and all required configurations
require "../config/config"
require "../db/migrations/*"
require "sam"
load_dependencies "jennifer"

# Here you can define your tasks
# desc "with description to be used by help command"
# task "test" do
#   puts "ping"
# end

desc "dummy data"
task "dummy" do
  tab = Tab.create({title: "Lipgloss", artist: "Charli XCX", tab: "...\nWIP :)\n..."})
end

Sam.help
