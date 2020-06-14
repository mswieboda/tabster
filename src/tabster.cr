require "../config/config"
require "kemal"

require "./routes/helpers/*"
require "./routes/*"

module Tabster
  get "/" do |env|
    serve_react(env)
  end

  get "/*" do |env|
    serve_react(env)
  end

  def self.set_content_type_json(env)
    env.response.content_type = "application/json"
  end

  def self.serve_react(env)
    env.response.headers["Access-Control-Allow-Origin"] = "*"
    file_path = Kemal.config.public_folder + "/index.html"
    send_file env, file_path
  end
end

Kemal.run
