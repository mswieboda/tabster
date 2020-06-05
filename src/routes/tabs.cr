module Tabster
  before_all "/api/tabs" { |env| set_content_type_json(env) }
  before_all "/api/tabs/:artist" { |env| set_content_type_json(env) }
  before_all "/api/tabs/:artist/:title" { |env| set_content_type_json(env) }

  get "/api/tabs" do |env|
    tabs = Tab.all.limit(25)
    tabs.to_a.to_json
  end

  post "/api/tabs" do |env|
    title = env.params.json["title"].as(String)
    artistId = env.params.json["artistId"].as(String | Nil)
    artist = env.params.json["artist"].as(String | Nil)
    tab = env.params.json["tab"].as(String)

    puts "title: #{title}"
    puts "artistId: #{artistId}"
    puts "artist: #{artist}"
    puts "tab: #{tab}"

    if artistId || artist
      Tab.create({
        title:  title,
        artist: artistId || artist,
        tab:    tab,
      }).to_json
    else
      halt env, status_code: 422
    end
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
end
