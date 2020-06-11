class AddCreatedByToTabs < Jennifer::Migration::Base
  def up
    change_table :tabs do |t|
      t.add_column :created_by_id, :integer
    end
  end

  def down
    change_table :tabs do |t|
      t.drop_column :created_by_id
    end
  end
end
