# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :trackable

  has_many :terms, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :term_tags, dependent: :destroy

  validates :username, presence: true,
                       allow_blank: false,
                       uniqueness: { case_sensitive: false }
end
