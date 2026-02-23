# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Term, type: :model do
  describe 'validations' do
    let(:user) { create(:user) }
    let(:source) { Source.create!(user: user, title: 'Source') }

    it 'is valid with phrase and source owned by user' do
      term = described_class.new(user: user, source: source, phrase: 'hola', priority: 1)

      expect(term).to be_valid
    end

    it 'is invalid when phrase and meaning are blank' do
      term = described_class.new(user: user, source: source, phrase: nil, meaning: nil, priority: 1)

      expect(term).not_to be_valid
      expect(term.errors[:base]).to include('Phrase or meaning must be present')
    end

    it 'is valid when meaning is present and phrase is blank' do
      term = described_class.new(user: user, source: source, phrase: nil, meaning: 'hello', priority: 1)

      expect(term).to be_valid
    end

    it 'is invalid when source belongs to another user' do
      another_user = create(:user)
      another_source = Source.create!(user: another_user, title: 'Another source')
      term = described_class.new(user: user, source: another_source, phrase: 'hola', priority: 1)

      expect(term).not_to be_valid
      expect(term.errors[:source]).to include('must belong to the current user')
    end

    it 'is invalid when priority is not greater than zero' do
      term = described_class.new(user: user, source: source, phrase: 'hola', priority: 0)

      expect(term).not_to be_valid
      expect(term.errors[:priority]).to include('must be greater than 0')
    end
  end
end
