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
    elsif !artist.blank?
      artist = Artist.create({name: artist})

      Tab.create({
        title:     title,
        artist_id: artist.id,
        tab:       tab,
      }).to_json
    else
      raise ValidationError.new(env, "Artist required")
    end
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
