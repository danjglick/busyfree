class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.json :friends, array: true, default: []
      t.string :busy_or_free, default: "busy"
      t.string :connected_to, default: ''
    end
  end
end
