class CreateArtistsAndTabs < Jennifer::Migration::Base
  def up
    create_table :artists do |t|
      t.string :name, {:null => false}

      t.timestamps
    end

    create_table :tabs do |t|
      t.string :title, {:null => false}
      t.reference :artist
      t.text :tab, {:null => false}

      t.timestamps
    end
  end

  def down
    drop_table :artists if table_exists? :artists
    drop_table :tabs if table_exists? :tabs
  end
end
