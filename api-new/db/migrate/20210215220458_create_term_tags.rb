# frozen_string_literal: true

class CreateTermTags < ActiveRecord::Migration[8.0]
  def change
    create_table :term_tags do |t|
      t.references :user, index: true
      t.references :term, index: true
      t.references :tag, index: true
    end
  end
end
