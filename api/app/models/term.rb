# frozen_string_literal: true

class Term < ApplicationRecord
  belongs_to :user

  has_many :term_tags, dependent: :destroy
  has_many :tags, through: :term_tags

  enum knowledge_level: {
    not_checked: 0,
    bad: 1,
    good: 2,
    excellent: 3
  }

  validates :phrase, :meaning, presence: true
end
