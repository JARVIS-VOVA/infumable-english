# frozen_string_literal: true

class Tag < ApplicationRecord
  belongs_to :user

  has_many :term_tags, dependent: :destroy
  has_many :terms, through: :term_tags

  validates :title, :color, presence: true
end
