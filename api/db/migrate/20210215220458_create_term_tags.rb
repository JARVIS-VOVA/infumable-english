class CreateTermTags < ActiveRecord::Migration[5.2]
  def change
    create_table :term_tags do |t|
      t.references :user, index: true
      t.references :term, index: true
      t.references :tag, index: true
    end
  end
end
