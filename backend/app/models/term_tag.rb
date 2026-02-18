# frozen_string_literal: true

class TermTag < ApplicationRecord
  belongs_to :user
  belongs_to :term
  belongs_to :tag

  validates :term, uniqueness: { scope: :tag_id }
  validate :owner_should_be_the_same_person

  private

  def owner_should_be_the_same_person
    term_user_id = self.term&.user_id
    tag_user_id = self.tag&.user_id
    return unless term_user_id && tag_user_id

    unless term_user_id == tag_user_id
      errors.add(:base, 'owner should be the same person')
    end
  end
end
