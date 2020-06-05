class Tab < Jennifer::Model::Base
  with_timestamps

  mapping(
    id: Primary32,
    title: String,
    artist_id: Int32?,
    tab: String,
    created_at: Time?,
    updated_at: Time?,
  )

  belongs_to :artist, Artist

  def to_json(json : JSON::Builder)
    json.object do
      json.field "id", id
      json.field "artist", artist
      json.field "title", title
      json.field "tab", tab
    end
  end
end
