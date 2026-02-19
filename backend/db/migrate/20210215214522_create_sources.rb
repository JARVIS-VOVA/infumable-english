# frozen_string_literal: true

class CreateSources < ActiveRecord::Migration[8.0]
  def change
    create_table :sources do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.string :title, null: false
      t.boolean :is_public, default: false, null: false

      t.timestamps
    end
  end
end
