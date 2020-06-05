module Tabster
  before_all "/api/tabs" { |env| set_content_type_json(env) }
  before_all "/api/tabs/:artist" { |env| set_content_type_json(env) }
  before_all "/api/tabs/:artist/:title" { |env| set_content_type_json(env) }

  get "/api/tabs" do |env|
    query = env.params.query["q"]?
    tabs = Tab.all

    if query
      if query.blank?
        tabs = tabs.none
      else
        tabs = tabs.relation(:artist)
          .where { (_artists__name.ilike("%#{query}%")) | (_title.ilike("%#{query}%")) }
      end
    end

    tabs.limit(25)
      .to_a
      .to_json
  end

  post "/api/tabs" do |env|
    title = env.params.json["title"].as(String)
    artist_id = env.params.json["artist_id"].as(Int64 | Nil)
    artist = env.params.json["artist"].as(String | Nil)
    tab = env.params.json["tab"].as(String)

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
    tab = Tab.all.relation(:artist)
      .where { (lower(_artists__name) == artist.downcase) & (lower(_title) == title.downcase) }
      .limit(1)
      .first

    if tab
      tab.to_json
    else
      response = {status_code: 404, message: "Tab not found"}.to_json
      halt env, status_code: 404, response: response
    end
  end
end
