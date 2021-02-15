# frozen_string_literal: true

class Card < ApplicationRecord
  has_and_belongs_to_many :tags

  validates :origin, :translate, presence: true
end
