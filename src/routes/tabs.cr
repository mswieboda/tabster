module Tabster
  get "/tabs/:artist" do |env|
    name = env.params.url["artist"]

    artist = Artist.all
      .where { lower(_name) == from_url(name).downcase }
      .limit(1)
      .first

    if artist && name != to_url_spaces(artist.name)
      env.redirect "/tabs/#{to_url(artist.name)}"
    else
      serve_react(env)
    end
  end

  get "/tabs/:artist/:title" do |env|
    name = env.params.url["artist"]
    title = env.params.url["title"]

    tab = Tab.all
      .relation(:artist)
      .where { (lower(_artists__name) == from_url(name).downcase) & (lower(_title) == from_url(title).downcase) }
      .limit(1)
      .first

    if tab && (name != to_url_spaces(tab.artist!.name) || title != to_url_spaces(tab.title))
      env.redirect "/tabs/#{to_url(tab.artist!.name)}/#{to_url(tab.title)}"
    else
      serve_react(env)
    end
  end

  get "/tabs" do |env|
    serve_react(env)
  end

  before_all "/api/tabs*" { |env| set_content_type_json(env) }

  get "/api/tabs" do |env|
    query = env.params.query["q"]?
    username = env.params.query["username"]?
    sort = env.params.query["sort"]?
    tabs = Tab.all

    if query
      if query.blank?
        tabs = tabs.none
      else
        tabs = tabs.relation(:artist)
          .where { (_artists__name.ilike("%#{query}%")) | (_title.ilike("%#{query}%")) }
      end
    elsif username
      tabs = tabs.relation(:created_by)
        .where { _users__username == from_url(username) }
    end

    if sort
      if sort == "newest"
        tabs = tabs.order(created_at: :desc)
      end
    end

    tabs.limit(25)
      .to_a
      .map { |tab| tab.to_search_result_hash }
      .to_json
  end

  post "/api/tabs" do |env|
    artist = env.params.json["artist"].as(Hash(String, JSON::Any)) if env.params.json.has_key?("artist")

    raise ValidationError.new(env, "artist required") unless artist

    artist_id = artist["id"].as_i?
    artist_name = artist["name"].as_s?

    title = env.params.json["title"]?
    tab = env.params.json["tab"]?

    artist_id ||= Artist.create({name: artist_name}).id

    Tab.create({
      title:     title.to_s,
      artist_id: artist_id,
      created_by_id: current_user_id(env),
      tab:       tab.to_s,
    }).to_json
  end

  patch "/api/tabs/:id" do |env|
    tab = Tab.find!(env.params.url["id"]?)

    raise AuthError.new(env, "not authorized") if tab.created_by_id != current_user_id(env)

    artist = env.params.json["artist"].as(Hash(String, JSON::Any)) if env.params.json.has_key?("artist")

    if artist
      artist_id = artist["id"].as_i?
      artist_name = artist["name"].as_s?

      artist_id ||= Artist.create({name: artist_name}).id

      tab.artist_id = artist_id
    end

    title = env.params.json["title"]?
    tab_content = env.params.json["tab"]?

    tab.title = title.to_s if title
    tab.tab = tab_content.to_s if tab_content

    tab.save!

    tab.to_json
  end

  get "/api/tabs/:artist" do |env|
    artist = env.params.url["artist"]

    Tab.all.relation(:artist)
      .where { _artists__name == from_url(artist) }
      .limit(25)
      .to_a
      .map { |tab| tab.to_search_result_hash }
      .to_json
  end

  get "/api/tabs/:artist/:title" do |env|
    artist = env.params.url["artist"]
    title = env.params.url["title"]

    tab = Tab.all
      .relation(:artist)
      .where { (_artists__name == from_url(artist)) & (_title == from_url(title)) }
      .limit(1)
      .first

    if tab
      tab.to_json
    else
      raise NotFoundError.new(env, "Tab not found")
    end
  end

  def self.from_url(str)
    str.gsub('+', ' ')
  end

  def self.to_url(str)
    to_url_spaces(to_url_escapes(str))
  end

  def self.to_url_spaces(str)
    str.gsub(' ', '+')
  end

  def self.to_url_escapes(str)
    str.gsub('?', "%3F")
  end
end
