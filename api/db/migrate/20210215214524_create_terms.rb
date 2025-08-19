# frozen_string_literal: true

class CreateTerms < ActiveRecord::Migration[8.0]
  def change
    create_table :terms do |t|
      t.references :user, index: true
      t.string :phrase
      t.string :meaning
      t.integer :knowledge_level, default: 0, null: false, index: true
      t.datetime :last_practice_at, index: true

      t.timestamps
    end
  end
end
