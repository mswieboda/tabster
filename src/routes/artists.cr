module Tabster
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
end
