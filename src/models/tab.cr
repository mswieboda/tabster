class Tab < Jennifer::Model::Base
  with_timestamps

  mapping(
    id: Primary32,
    title: String,
    artist: String,
    tab: String,
    created_at: Time?,
    updated_at: Time?,
  )
end
