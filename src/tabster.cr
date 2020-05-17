require "kemal"

get "/" do |env|
  render "src/views/app.ecr", "src/views/layouts/react.ecr"
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

Kemal.run
