# frozen_string_literal: true

require 'swagger_helper'

# rubocop:disable RSpec/MultipleMemoizedHelpers
RSpec.describe 'api/v1/terms', type: :request do
  let(:current_user) { create(:user) }
  let(:source) { Source.create!(user: current_user, title: 'My source') }

  before { sign_in current_user }

  path '/api/v1/terms' do
    get '#index' do
      tags 'Terms'
      produces 'application/json'
      parameter name: :user_id, in: :query, type: :integer, required: false
      parameter name: :source_id, in: :query, type: :integer, required: false
      parameter name: :learnt, in: :query, schema: { type: :boolean }, required: false
      parameter name: :page, in: :query, type: :integer, required: false
      parameter name: :per_page, in: :query, type: :integer, required: false

      response 200, 'terms list returned' do
        let!(:term) { Term.create!(user: current_user, source: source, phrase: 'hola', meaning: 'hello') }

        run_test! do |response|
          expect(json_response[:data].map { |item| item[:id] }).to include(term.id)
        end
      end

      response 200, 'terms list filtered by source and learnt with custom per_page' do
        let(:source_id) { source.id }
        let(:learnt) { false }
        let(:per_page) { 1 }
        let!(:matching_term) { Term.create!(user: current_user, source: source, phrase: 'hola', meaning: 'hello', learnt: false) }
        let!(:filtered_out_term) { Term.create!(user: current_user, source: source, phrase: 'adios', meaning: 'bye', learnt: true) }

        run_test! do |response|
          ids = json_response[:data].map { |item| item[:id] }

          expect(ids).to include(matching_term.id)
          expect(ids).not_to include(filtered_out_term.id)
          expect(json_response[:meta][:per_page]).to eq(1)
        end
      end

      response 200, 'terms list returns last page when requested page is out of range' do
        let(:page) { 999 }
        let!(:term) { Term.create!(user: current_user, source: source, phrase: 'hola', meaning: 'hello') }

        run_test! do |_response|
          expect(json_response[:data].map { |item| item[:id] }).to include(term.id)
          expect(json_response[:meta][:current_page]).to eq(json_response[:meta][:total_pages])
          expect(json_response[:meta][:current_page]).to eq(1)
        end
      end
    end

    post '#create' do
      tags 'Terms'
      consumes 'application/json'
      parameter name: :term, in: :body, schema: {
        type: :object,
        properties: {
          term: {
            type: :object,
            properties: {
              phrase: { type: :string, nullable: true },
              meaning: { type: :string, nullable: true },
              source_id: { type: :integer }
            },
            required: ['source_id']
          },
          terms: {
            type: :array,
            items: {
              type: :object,
              properties: {
                phrase: { type: :string, nullable: true },
                meaning: { type: :string, nullable: true },
                source_id: { type: :integer }
              },
              required: ['source_id']
            }
          }
        },
        oneOf: [
          { required: ['term'] },
          { required: ['terms'] }
        ]
      }

      response 201, 'term created' do
        let(:term) { { term: { phrase: 'amigo', meaning: 'friend', source_id: source.id } } }

        run_test! do |_response|
          expect(Term.where(user: current_user, source: source, phrase: 'amigo')).to exist
        end
      end

      response 201, 'terms created from batch payload with blank row skipped' do
        let(:term) do
          {
            terms: [
              { phrase: '  hello  ', meaning: '  hola  ', source_id: source.id },
              { phrase: '   ', meaning: '   ', source_id: source.id }
            ]
          }
        end

        run_test! do |response|
          created_phrase = json_response.first[:phrase]
          created_meaning = json_response.first[:meaning]

          expect(json_response.size).to eq(1)
          expect(created_phrase).to eq('hello')
          expect(created_meaning).to eq('hola')
        end
      end

      response 422, 'all rows are empty in batch payload' do
        let(:term) do
          {
            terms: [
              { phrase: ' ', meaning: ' ', source_id: source.id }
            ]
          }
        end

        run_test! do |response|
          expect(json_response[:errors]).to include('At least one non-empty row is required')
        end
      end

      response 403, 'source does not belong to current user' do
        let(:other_source) { Source.create!(user: create(:user), title: 'Other source') }
        let(:term) { { term: { phrase: 'amigo', source_id: other_source.id } } }

        run_test!
      end
    end
  end

  path '/api/v1/terms/{id}' do
    parameter name: :id, in: :path, type: :integer

    get '#show' do
      tags 'Terms'
      produces 'application/json'

      response 200, 'term found' do
        let(:existing_term) { Term.create!(user: current_user, source: source, phrase: 'hola') }
        let(:id) { existing_term.id }

        run_test!
      end
    end

    patch '#update' do
      tags 'Terms'
      consumes 'application/json'
      parameter name: :term, in: :body, schema: {
        type: :object,
        properties: {
          term: {
            type: :object,
            properties: {
              phrase: { type: :string, nullable: true },
              meaning: { type: :string, nullable: true },
              learnt: { type: :boolean, nullable: true }
            }
          }
        },
        required: ['term']
      }

      response 202, 'term updated' do
        let(:existing_term) { Term.create!(user: current_user, source: source, phrase: 'hola') }
        let(:id) { existing_term.id }
        let(:term) { { term: { meaning: 'hello', learnt: true } } }

        run_test! do |_response|
          existing_term.reload
          expect(existing_term.meaning).to eq('hello')
          expect(existing_term.learnt).to be(true)
        end
      end

      response 422, 'term update invalid' do
        let(:existing_term) { Term.create!(user: current_user, source: source, phrase: 'hola') }
        let(:id) { existing_term.id }
        let(:term) { { term: { phrase: '', meaning: '' } } }

        run_test! do |response|
          expect(json_response[:errors]).to include('Phrase or meaning must be present')
        end
      end
    end

    delete '#destroy' do
      tags 'Terms'

      response 200, 'term destroyed' do
        let(:existing_term) { Term.create!(user: current_user, source: source, phrase: 'hola') }
        let(:id) { existing_term.id }

        run_test! do
          expect(Term.where(id: id)).not_to exist
        end
      end
    end
  end
end
# rubocop:enable RSpec/MultipleMemoizedHelpers
