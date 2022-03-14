# frozen_string_literal: true

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:cards).class_name('Card') }
    it { should have_many(:tags).class_name('Tag') }
    it { should have_many(:cards_tags).class_name('CardsTag') }
  end

  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_uniqueness_of(:username).ignoring_case_sensitivity }
  end
end
