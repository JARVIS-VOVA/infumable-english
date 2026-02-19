# frozen_string_literal: true

require 'swagger_helper'

# rubocop:disable RSpec/MultipleMemoizedHelpers
RSpec.describe 'api/v1/sources', type: :request do
  let(:current_user) { create(:user) }

  before { sign_in current_user }

  path '/api/v1/sources' do
    get '#index' do
      tags 'Sources'
      produces 'application/json'

      response 200, 'sources list returned' do
        let!(:source) { Source.create!(user: current_user, title: 'Spanish basics') }

        run_test! do |response|
          payload = JSON.parse(response.body, symbolize_names: true)
          expect(payload[:data].map { |item| item[:id] }).to include(source.id)
        end
      end
    end

    post '#create' do
      tags 'Sources'
      consumes 'application/json'
      parameter name: :source, in: :body, schema: {
        type: :object,
        properties: {
          source: {
            type: :object,
            properties: {
              title: { type: :string },
              is_public: { type: :boolean, nullable: true },
              text: { type: :string, nullable: true }
            },
            required: ['title']
          }
        },
        required: ['source']
      }

      response 201, 'source created' do
        let(:source) { { source: { title: 'Spanish basics', is_public: false } } }

        run_test! do
          expect(Source.where(user: current_user, title: 'Spanish basics')).to exist
        end
      end

      response 422, 'invalid payload' do
        let(:source) { { source: { title: '' } } }

        run_test!
      end
    end
  end

  path '/api/v1/sources/public' do
    get '#public_index' do
      tags 'Sources'
      produces 'application/json'

      response 200, 'public sources returned' do
        let(:owner) { create(:user) }
        let!(:public_source) { Source.create!(user: owner, title: 'Public source', is_public: true) }
        let!(:private_source) { Source.create!(user: owner, title: 'Private source', is_public: false) }

        run_test! do |response|
          payload = JSON.parse(response.body, symbolize_names: true)
          ids = payload[:data].map { |item| item[:id] }
          expect(ids).to include(public_source.id)
          expect(ids).not_to include(private_source.id)
        end
      end
    end
  end

  path '/api/v1/sources/{id}' do
    parameter name: :id, in: :path, type: :integer

    get '#show' do
      tags 'Sources'
      produces 'application/json'

      response 200, 'source found' do
        let(:existing_source) { Source.create!(user: current_user, title: 'Source to show') }
        let(:id) { existing_source.id }

        run_test!
      end

      response 403, 'forbidden for private source from other user' do
        let(:existing_source) { Source.create!(user: create(:user), title: 'Hidden source', is_public: false) }
        let(:id) { existing_source.id }

        run_test!
      end
    end

    patch '#update' do
      tags 'Sources'
      consumes 'application/json'
      parameter name: :source, in: :body, schema: {
        type: :object,
        properties: {
          source: {
            type: :object,
            properties: {
              title: { type: :string },
              is_public: { type: :boolean, nullable: true }
            }
          }
        },
        required: ['source']
      }

      response 202, 'source updated' do
        let(:existing_source) { Source.create!(user: current_user, title: 'Old title') }
        let(:id) { existing_source.id }
        let(:source) { { source: { title: 'New title' } } }

        run_test! do
          expect(existing_source.reload.title).to eq('New title')
        end
      end
    end

    delete '#destroy' do
      tags 'Sources'

      response 200, 'source destroyed' do
        let(:existing_source) { Source.create!(user: current_user, title: 'To remove') }
        let(:id) { existing_source.id }

        run_test! do
          expect(Source.where(id: id)).not_to exist
        end
      end
    end
  end

  path '/api/v1/sources/{id}/clone' do
    parameter name: :id, in: :path, type: :integer

    post '#clone' do
      tags 'Sources'

      response 201, 'source cloned' do
        let(:owner) { create(:user) }
        let(:original_source) { Source.create!(user: owner, title: 'Clone me', is_public: true) }
        let!(:original_term) { Term.create!(user: owner, source: original_source, phrase: 'hola', priority: 2) }
        let(:id) { original_source.id }

        run_test! do |response|
          original_term
          payload = JSON.parse(response.body, symbolize_names: true)
          expect(payload[:user_id]).to eq(current_user.id)
          expect(payload[:title]).to eq('Clone me')
        end
      end
    end
  end

  path '/api/v1/sources/{id}/analyze' do
    parameter name: :id, in: :path, type: :integer

    post '#analyze' do
      tags 'Sources'
      consumes 'application/json'
      parameter name: :source, in: :body, schema: {
        type: :object,
        properties: {
          source: {
            type: :object,
            properties: {
              text: { type: :string }
            },
            required: ['text']
          }
        },
        required: ['source']
      }

      response 200, 'text analyzed and terms added' do
        let(:existing_source) { Source.create!(user: current_user, title: 'Analyze me') }
        let!(:existing_hello_term) do
          Term.create!(user: current_user, source: existing_source, phrase: 'hello', priority: 1)
        end
        let!(:existing_world_term) do
          Term.create!(user: current_user, source: existing_source, phrase: 'world', priority: 1)
        end
        let(:id) { existing_source.id }
        let(:source) { { source: { text: 'Hello world hello' } } }

        run_test! do |_response|
          existing_hello_term
          existing_world_term
          expect(existing_source.terms.where(phrase: 'hello').first&.priority).to eq(3)
          expect(existing_source.terms.where(phrase: 'world').first&.priority).to eq(2)
        end
      end
    end
  end
end
# rubocop:enable RSpec/MultipleMemoizedHelpers
