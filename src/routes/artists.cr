module Tabster
  before_all "/api/artists" { |env| set_content_type_json(env) }
  before_all "/api/artists/:artist" { |env| set_content_type_json(env) }

  get "/api/artists" do |env|
    artists = Artist.all.limit(25)
    artists.to_a.to_json
  end

  get "/api/artists/:artist" do |env|
    artist = env.params.url["artist"].gsub('+', ' ')
    tabs = Tab.all.where { lower(Tab._artist) == artist.downcase }.limit(25)
    tabs.to_a.to_json
  end
end
