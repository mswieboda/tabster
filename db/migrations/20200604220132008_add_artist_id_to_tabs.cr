class AddArtistIdToTabs < Jennifer::Migration::Base
  def up
    change_table :tabs do |t|
      t.add_reference :artist
      t.drop_column :artist
    end
  end

  def down
    change_table :tabs do |t|
      t.add_column :artist, :string, {:null => false}
      t.drop_column :artist_id
    end
  end
end
