class Tabster::Tab < Jennifer::Model::Base
  table_name :tabs

  with_timestamps

  mapping(
    id: Primary32,
    artist_id: Int32?,
    created_by_id: Int32?,
    tab: String,
    title: String,
    created_at: Time?,
    updated_at: Time?,
  )

  belongs_to :artist, Artist
  belongs_to :created_by, User, foreign: :created_by_id

  validates_uniqueness :artist_id, :title

  def to_json(json : JSON::Builder)
    json.object do
      json.field "id", id

      json.field "artist" do
        artist.to_json(json)
      end

      json.field "created_by_username", created_by.try(&.username) || User::ANONYMOUS_USERNAME
      json.field "tab", tab
      json.field "title", title
    end
  end

  def to_search_result_hash
    {
      :artist => artist.try(&.name) || Artist::ANONYMOUS_NAME,
      :title  => title,
    }
  end
end
