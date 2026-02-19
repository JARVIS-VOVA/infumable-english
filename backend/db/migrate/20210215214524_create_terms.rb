# frozen_string_literal: true

class CreateTerms < ActiveRecord::Migration[8.0]
  def change
    create_table :terms do |t|
      t.references :user, index: true
      t.references :source, foreign_key: true, index: true
      t.string :phrase
      t.string :meaning
      t.integer :priority, default: 1, null: false, index: true
      t.boolean :learnt, default: false, null: false, index: true

      t.timestamps
    end
  end
end
