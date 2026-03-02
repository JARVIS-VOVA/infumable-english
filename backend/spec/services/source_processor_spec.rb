# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SourceProcessor do
  describe '#call' do
    let(:user) { create(:user) }
    let(:source) { Source.create!(user: user, title: 'Words') }

    it 'creates new terms from normalized words' do
      source.terms.create!(user: user, phrase: 'hello', meaning: nil, priority: 1)

      described_class.new(text: 'Hello world hello', source_id: source.id).call

      expect(source.terms.pluck(:phrase)).to match_array(%w[hello world])
      expect(source.terms.find_by(phrase: 'world')&.priority).to eq(1)
    end

    it 'increments priority for existing terms by frequency' do
      source.terms.create!(user: user, phrase: 'hello', meaning: nil, priority: 1)

      described_class.new(text: 'Hello world hello', source_id: source.id).call

      expect(source.terms.find_by(phrase: 'hello')&.priority).to eq(3)
    end

    it 'accumulates priorities across multiple calls' do
      source.terms.create!(user: user, phrase: 'hello', meaning: nil, priority: 1)

      described_class.new(text: 'Hello world hello', source_id: source.id).call
      described_class.new(text: 'hello again', source_id: source.id).call

      expect(source.terms.count).to eq(3)
      expect(source.terms.find_by(phrase: 'hello')&.priority).to eq(4)
      expect(source.terms.find_by(phrase: 'again')&.priority).to eq(1)
    end

    it 'preserves existing meanings' do
      term = source.terms.create!(user: user, phrase: 'hello', meaning: 'привіт', priority: 1)

      described_class.new(text: 'hello world', source_id: source.id).call

      term.reload
      expect(term.priority).to eq(2)
      expect(term.meaning).to eq('привіт')
    end
  end
end
