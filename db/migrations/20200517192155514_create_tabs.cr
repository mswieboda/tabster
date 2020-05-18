class CreateTabs < Jennifer::Migration::Base
  def up
    create_table :tabs do |t|
      t.string :title, { :null => false }
      t.string :artist, { :null => false }
      t.string :tab, { :null => false }

      t.timestamps
    end
  end

  def down
    drop_table :tabs if table_exists? :tabs
  end
end
