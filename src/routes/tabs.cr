module Tabster
  before_all "/api/tabs" { |env| set_content_type_json(env) }
  before_all "/api/tabs/:artist" { |env| set_content_type_json(env) }
  before_all "/api/tabs/:artist/:title" { |env| set_content_type_json(env) }

  get "/api/tabs" do |env|
    tabs = Tab.all.limit(25)
    tabs.to_a.to_json
  end

  get "/api/tabs?" do |env|
    query = env.params.query["q"].as(String)
    tabs = Tab.all.relation(:artist)
      .where { (_artists__name.ilike("%#{query}%")) | (_title.ilike("%#{query}%")) }
      .limit(25)

    tabs.to_a.to_json
  end

  post "/api/tabs" do |env|
    title = env.params.json["title"].as(String)
    artist_id = env.params.json["artist_id"].as(Int64 | Nil)
    artist = env.params.json["artist"].as(String | Nil)
    tab = env.params.json["tab"].as(String)

    puts "title: #{title}"
    puts "artist_id: #{artist_id}"
    puts "artist: #{artist}"
    puts "tab: #{tab}"

    if artist_id
      Tab.create({
        title:     title,
        artist_id: artist_id.to_i,
        tab:       tab,
      }).to_json
    elsif artist
      artist = Artist.create({name: artist})

      Tab.create({
        title:     title,
        artist_id: artist.id,
        tab:       tab,
      }).to_json
    else
      halt env, status_code: 422
    end
  end

  get "/api/tabs/:artist" do |env|
    artist = env.params.url["artist"].gsub('+', ' ')
    tabs = Tab.all.relation(:artist)
      .where { lower(_artists__name) == artist.downcase }
      .limit(25)

    tabs.to_a.to_json
  end

  get "/api/tabs/:artist/:title" do |env|
    # Fix until Kemal supports + as whitespace in params
    artist = env.params.url["artist"].gsub('+', ' ')
    title = env.params.url["title"].gsub('+', ' ')
    tabs = Tab.all.relation(:artist)
      .where { (lower(_artists__name) == artist.downcase) & (lower(_title) == title.downcase) }
      .limit(1)

    if tabs.first
      tabs.first.as(Tab).to_json
    else
      halt env, status_code: 404
    end
  end
end
