class Artist < Jennifer::Model::Base
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
