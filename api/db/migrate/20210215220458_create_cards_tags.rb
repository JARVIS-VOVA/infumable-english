class CreateCardsTags < ActiveRecord::Migration[5.2]
  def change
    create_table :cards_tags, id: false do |t|
      t.belongs_to :card
      t.belongs_to :tag
    end
  end
end
