class AddEmailConfirmationToUsers < Jennifer::Migration::Base
  def up
    change_table :users do |t|
      t.add_column :email_confirmation_token, :string, {:null => false, :default => ""}
      t.add_column :email_confirmed_at, :timestamp
    end
  end

  def down
    change_table :users do |t|
      t.drop_column :email_confirmation_token
      t.drop_column :email_confirmed_at
    end
  end
end
