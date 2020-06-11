module Tabster
  get "/tabs/:artist" do |env|
    name = env.params.url["artist"]
    artist = Artist.all
      .where { lower(_name) == name.gsub('+', ' ').downcase }
      .limit(1)
      .first

    if artist && name != artist.name_escaped
      env.redirect "/tabs/#{artist.name_escaped}"
    else
      serve_react(env)
    end
  end

  before_all "/api/artists*" { |env| set_content_type_json(env) }

  get "/api/artists" do |env|
    query = env.params.query["q"]?
    artists = Artist.all

    if query
      if query.blank?
        artists = artists.none
      else
        artists = artists.where { _name.ilike("%#{query}%") }
      end
    end

    artists.limit(25)
      .to_a
      .to_json
  end

  get "/api/artists/:artist" do |env|
    artist = env.params.url["artist"].gsub('+', ' ')
    Tab.all.relation(:artist)
      .where { lower(_artists__name) == artist.downcase }
      .limit(25)
      .to_a
      .map { |tab| tab.to_search_result_hash }
      .to_json
  end
end
