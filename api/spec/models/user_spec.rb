# frozen_string_literal: true

RSpec.describe User, type: :model do
  # describe 'associations' do
  #   should belong_to(:category).class_name('MenuCategory')
  # end

  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_uniqueness_of(:username).ignoring_case_sensitivity }
  end
end
