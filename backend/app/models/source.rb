# frozen_string_literal: true

class Source < ApplicationRecord
  belongs_to :user

  has_many :terms, dependent: :destroy

  validates :title, presence: true

  scope :publicly_available, -> { where(is_public: true) }

  def copy_to_user(new_user)
    transaction do
      copied_source = dup
      copied_source.user_id = new_user.id
      copied_source.is_public = false
      copied_source.save!

      terms.find_each do |term|
        copied_source.terms.create!(
          user: new_user,
          phrase: term.phrase,
          meaning: nil,
          priority: term.priority
        )
      end

      copied_source
    end
  end
end
