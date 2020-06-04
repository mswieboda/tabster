require "../config/config"
require "kemal"

get "/" do |env|
  serve_react(env)
end

get "/*" do |env|
  serve_react(env)
end

before_all "/tabs/:id" do |env|
  env.response.content_type = "application/json"
end

get "/api/tabs/:artist/:title" do |env|
  # Fix until Kemal supports + as whitespace in params
  artist = env.params.url["artist"].gsub('+', ' ')
  title = env.params.url["title"].gsub('+', ' ')
  tabs = Tab.all.where { lower(Tab._artist) == artist.downcase && lower(Tab._title) == title.downcase }

  if tabs.first
    tab = tabs.first.as(Tab)

    {
      "id":     tab.id,
      "title":  tab.title,
      "artist": tab.artist,
      "tab":    tab.tab,
    }.to_json
  else
    halt env, status_code: 404
  end
end

def serve_react(env)
  env.response.headers["Access-Control-Allow-Origin"] = "*"
  file_path = Kemal.config.public_folder + "/index.html"
  send_file env, file_path
end

Kemal.run
