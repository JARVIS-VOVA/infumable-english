# frozen_string_literal: true

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:terms).class_name('Term') }
    it { should have_many(:tags).class_name('Tag') }
    it { should have_many(:term_tags).class_name('TermTag') }
  end

  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_uniqueness_of(:username).ignoring_case_sensitivity }
  end
end
