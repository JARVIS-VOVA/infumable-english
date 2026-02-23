# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TermsQuery, type: :model do
  describe '#call' do
    let(:current_user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:current_user_source) { Source.create!(user: current_user, title: 'Current user source') }
    let(:second_source) { Source.create!(user: current_user, title: 'Second source') }
    let(:other_user_source) { Source.create!(user: other_user, title: 'Other user source') }

    it 'defaults to current user, sorts by priority desc and created_at desc' do
      oldest = Term.create!(user: current_user, source: current_user_source, phrase: 'oldest', priority: 2, created_at: 2.days.ago)
      newest = Term.create!(user: current_user, source: current_user_source, phrase: 'newest', priority: 2, created_at: 1.day.ago)
      top = Term.create!(user: current_user, source: current_user_source, phrase: 'top', priority: 5)
      Term.create!(user: other_user, source: other_user_source, phrase: 'foreign', priority: 99)

      result = described_class.new(current_user: current_user).call

      expect(result.pluck(:id)).to eq([top.id, newest.id, oldest.id])
    end

    it 'filters by source and uses default source limit of 20 when limit is absent' do
      22.times do |n|
        Term.create!(user: current_user, source: current_user_source, phrase: "source-term-#{n}", priority: 1)
      end
      Term.create!(user: current_user, source: second_source, phrase: 'second-source-term', priority: 1)

      result = described_class.new(current_user: current_user, options: { source_id: current_user_source.id }).call

      expect(result.count).to eq(20)
      expect(result.pluck(:source_id).uniq).to eq([current_user_source.id])
    end

    it 'applies explicit limit when provided' do
      5.times do |n|
        Term.create!(user: current_user, source: current_user_source, phrase: "term-#{n}", priority: 1)
      end

      result = described_class.new(
        current_user: current_user,
        options: { source_id: current_user_source.id, limit: '2' }
      ).call

      expect(result.count).to eq(2)
    end

    it 'filters by learnt when key exists in options' do
      learnt_term = Term.create!(user: current_user, source: current_user_source, phrase: 'learnt', priority: 1, learnt: true)
      Term.create!(user: current_user, source: current_user_source, phrase: 'new', priority: 1, learnt: false)

      result = described_class.new(current_user: current_user, options: { learnt: true }).call

      expect(result.pluck(:id)).to eq([learnt_term.id])
    end
  end
end
