require "kemal"

public_folder "react/build"

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

  {
    "id":     id,
    "title":  "Lipgloss",
    "artist": "Charli XCX",
    "tab":    "alskdjflasdjfl asjdflkjsdf",
  }.to_json
end

def serve_react(env)
  env.response.headers["Access-Control-Allow-Origin"] = "*"
  file_path = Kemal.config.public_folder + "/index.html"
  send_file env, file_path
end

Kemal.run
