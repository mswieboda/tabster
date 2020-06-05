# here load jennifer and all required configurations
require "../config/config"
require "../db/migrations/*"
require "sam"
load_dependencies "jennifer"

desc "dummy data"
task "dummy" do
  artist = Artist.create({name: "Charli XCX"})
  tab = Tab.create({title: "Lipgloss", artist_id: artist.id, tab: "...\nWIP :)\n..."})
end

Sam.help
