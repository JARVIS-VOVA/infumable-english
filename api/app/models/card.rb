# frozen_string_literal: true

class Card < ApplicationRecord
  belongs_to :user

  has_many :cards_tags, dependent: :destroy
  has_many :tags, through: :cards_tags

  validates :origin, :translate, presence: true
end
