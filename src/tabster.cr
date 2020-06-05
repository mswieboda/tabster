require "../config/config"
require "kemal"

require "./routes/*"

get "/" do |env|
  serve_react(env)
end

get "/*" do |env|
  serve_react(env)
end

error 404 do |env, exc|
  puts ">>>>>>>>>>"
  puts ">>>>>>>>>> 404"
  puts ">>>>>>>>>>"
  puts env.response.headers
  "This is a customized 404 page."
end

error 403 do
  "Access Forbidden!"
end

error 500 do |env, exc|
  puts ">>>>>>>>>>"
  puts ">>>>>>>>>> 404"
  puts ">>>>>>>>>>"
  puts env.response.headers
  "Everything's broken!"
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
