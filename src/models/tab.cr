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

  def to_json(json : JSON::Builder)
    json.object do
      json.field "artist", artist.try(&.name) || Artist::ANONYMOUS_NAME

      json.field "created_by" do
        json.object do
          json.field "username", created_by.try(&.username) || User::ANONYMOUS_USERNAME
          json.field "email", created_by.try(&.email)
        end
      end

      json.field "tab", tab
      json.field "title", title
    end
  end

  def title_escaped
    URI.encode_www_form(title)
  end
end
