# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :trackable

  # validates :username, uniqueness: { case_sensitive: false },
  # presence: true, allow_blank: false, format: { with: /\A[a-zA-Z0-9]+\z/ }
end
