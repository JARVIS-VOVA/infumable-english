# frozen_string_literal: true

class Term < ApplicationRecord
  belongs_to :user

  has_many :term_tags, dependent: :destroy
  has_many :tags, through: :term_tags

  validates :phrase, :meaning, presence: true
end
