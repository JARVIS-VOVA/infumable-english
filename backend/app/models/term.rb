# frozen_string_literal: true

class Term < ApplicationRecord
  belongs_to :user
  belongs_to :source

  validates :priority, numericality: { greater_than: 0 }
  validate :phrase_or_meaning_present
  validate :source_belongs_to_user

  private

  def phrase_or_meaning_present
    return if phrase.present? || meaning.present?

    errors.add(:base, 'Phrase or meaning must be present')
  end

  def source_belongs_to_user
    return if source.blank? || user.blank?
    return if source.user_id == user_id

    errors.add(:source, 'must belong to the current user')
  end
end
