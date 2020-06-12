class Tabster::Artist < Jennifer::Model::Base
  ANONYMOUS_NAME = "anonymous"

  table_name :artists

  with_timestamps

  mapping(
    id: Primary32,
    name: String,
    created_at: Time?,
    updated_at: Time?,
  )

  has_many :tabs, Tab

  def to_json(json : JSON::Builder)
    json.object do
      json.field "id", id
      json.field "name", name
    end
  end
end
