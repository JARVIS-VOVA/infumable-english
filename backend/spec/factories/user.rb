# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "user_#{n}@example.com"
    end
    sequence :username do |n|
      "username_#{n}"
    end
    password { FFaker::Internet.password }
  end
end
