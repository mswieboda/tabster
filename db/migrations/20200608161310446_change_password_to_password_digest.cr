class ChangePasswordToPasswordDigest < Jennifer::Migration::Base
  def up
    exec("ALTER TABLE users RENAME COLUMN password TO password_digest")
  end

  def down
    exec("ALTER TABLE users RENAME COLUMN password_digest TO password")
  end
end
