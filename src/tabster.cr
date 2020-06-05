require "../config/config"
require "kemal"

require "./routes/*"

get "/" do |env|
  serve_react(env)
end

get "/*" do |env|
  serve_react(env)
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
