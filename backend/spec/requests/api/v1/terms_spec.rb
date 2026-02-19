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

      response 200, 'terms list returned' do
        let!(:term) { Term.create!(user: current_user, source: source, phrase: 'hola', meaning: 'hello') }

        run_test! do |response|
          payload = JSON.parse(response.body, symbolize_names: true)
          expect(payload[:data].map { |item| item[:id] }).to include(term.id)
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
          }
        },
        required: ['term']
      }

      response 201, 'term created' do
        let(:term) { { term: { phrase: 'amigo', meaning: 'friend', source_id: source.id } } }

        run_test! do |_response|
          expect(Term.where(user: current_user, source: source, phrase: 'amigo')).to exist
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
