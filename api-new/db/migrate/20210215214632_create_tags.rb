# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.references :user, index: true
      t.string :title
      t.string :color

      t.timestamps
    end
  end
end
