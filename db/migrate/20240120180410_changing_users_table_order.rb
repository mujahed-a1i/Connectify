class ChangingUsersTableOrder < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :first_name, :string, :after => :password_digest
    change_column :users, :last_name, :string, :after => :first_name
  end
end
