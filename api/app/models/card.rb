# frozen_string_literal: true

class Card < ApplicationRecord
  has_and_belongs_to_many :tags

  belongs_to :user

  validates :origin, :translate, presence: true
end
