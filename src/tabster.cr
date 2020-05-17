require "kemal"

get "/" do |env|
  render "src/views/app.ecr", "src/views/layouts/react.ecr"
end

Kemal.run
