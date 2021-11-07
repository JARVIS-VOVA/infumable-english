# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :trackable

  has_many :cards, dependent: :destroy
  has_many :tags, dependent: :destroy

  validates :username, presence: true,
                       allow_blank: false,
                       uniqueness: { case_sensitive: false }
end
