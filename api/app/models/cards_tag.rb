# frozen_string_literal: true

class CardsTag < ApplicationRecord
  belongs_to :user
  belongs_to :card
  belongs_to :tag

  validates :card, uniqueness: { scope: :tag_id }
  validate :owner_should_be_the_same_person

  private

  def owner_should_be_the_same_person
    return if card_id.nil? || tag_id.nil?

    card_user_id = Card.find(card_id)
    tag_user_id = Tag.find(tag_id)
    unless card_user_id == tag_user_id
      errors.add(:base, 'owner should be the same person')
    end
  end
end
