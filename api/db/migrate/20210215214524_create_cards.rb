class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :origin
      t.string :translate

      t.timestamps
    end
  end
end
