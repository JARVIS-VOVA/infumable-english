class CreateCardsTags < ActiveRecord::Migration[5.2]
  def change
    create_table :cards_tags do |t|
      t.references :user, index: true
      t.references :card, index: true
      t.references :tag, index: true
    end
  end
end
