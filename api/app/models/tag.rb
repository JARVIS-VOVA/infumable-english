# frozen_string_literal: true

class Tag < ApplicationRecord
  belongs_to :user

  has_many :cards_tags, dependent: :destroy
  has_many :cards, through: :cards_tags

  validates :title, :color, presence: true
end
