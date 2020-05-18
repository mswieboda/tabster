require "../config/config"
require "kemal"

get "/" do |env|
  serve_react(env)
end

get "/*" do |env|
  serve_react(env)
end

before_all "/tabs/:id" do |env|
  puts "Setting response content type"
  env.response.content_type = "application/json"
end

get "/api/tabs/:id" do |env|
  puts env.response.headers["Content-Type"] # => "application/json"

  id = env.params.url["id"]

  tabs = Tab.all.where { Tab._id == id }

  if tabs.first
    tab = tabs.first.as(Tab)

    {
      "id":     tab.id,
      "title":  tab.title,
      "artist": tab.artist,
      "tab":    tab.tab,
    }.to_json
  else
    "404"
  end
end

def serve_react(env)
  env.response.headers["Access-Control-Allow-Origin"] = "*"
  file_path = Kemal.config.public_folder + "/index.html"
  send_file env, file_path
end

Kemal.run
