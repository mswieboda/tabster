class CreateArtists < Jennifer::Migration::Base
  def up
    create_table :artists do |t|
      t.string :name, { :null => false }

      t.timestamps
    end
  end

  def down
    drop_table :artists if table_exists? :artists
  end
end
