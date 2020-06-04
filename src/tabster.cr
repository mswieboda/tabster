require "../config/config"
require "kemal"

get "/" do |env|
  serve_react(env)
end

get "/*" do |env|
  serve_react(env)
end

before_all "/api/tabs" { |env| set_content_type_json(env) }
before_all "/api/tabs/:artist" { |env| set_content_type_json(env) }
before_all "/api/tabs/:artist/:title" { |env| set_content_type_json(env) }

get "/api/tabs" do |env|
  tabs = Tab.all.limit(25)
  tabs.to_a.to_json
end

get "/api/tabs/:artist" do |env|
  artist = env.params.url["artist"].gsub('+', ' ')
  tabs = Tab.all.where { lower(Tab._artist) == artist.downcase }.limit(25)
  tabs.to_a.to_json
end

get "/api/tabs/:artist/:title" do |env|
  # Fix until Kemal supports + as whitespace in params
  artist = env.params.url["artist"].gsub('+', ' ')
  title = env.params.url["title"].gsub('+', ' ')
  tabs = Tab.all.where { lower(Tab._artist) == artist.downcase && lower(Tab._title) == title.downcase }

  if tabs.first
    tabs.first.as(Tab).to_json
  else
    halt env, status_code: 404
  end
end

def set_content_type_json(env)
  env.response.content_type = "application/json"
end

def serve_react(env)
  env.response.headers["Access-Control-Allow-Origin"] = "*"
  file_path = Kemal.config.public_folder + "/index.html"
  send_file env, file_path
end

Kemal.run
