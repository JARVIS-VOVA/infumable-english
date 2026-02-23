# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/current_user', type: :request do
  let(:auth_user) { nil }

  before { sign_in auth_user if auth_user }

  path '/api/v1/current_user' do
    get '#show' do
      tags 'CurrentUser'
      produces 'application/json'

      response 200, 'returns current user' do
        let(:current_user) { create(:user) }
        let(:auth_user) { current_user }

        run_test! do |response|
          expect(json_response[:id]).to eq(current_user.id)
        end
      end

      response 401, 'unauthorized' do
        run_test!
      end
    end

    patch '#update' do
      tags 'CurrentUser'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              username: { type: :string }
            },
            required: ['username']
          }
        },
        required: ['user']
      }

      response 200, 'updates current user' do
        let(:current_user) { create(:user, username: 'old_name') }
        let(:auth_user) { current_user }
        let(:user) { { user: { username: 'new_name' } } }

        run_test! do
          expect(current_user.reload.username).to eq('new_name')
        end
      end

      response 422, 'invalid payload' do
        let(:current_user) { create(:user, username: 'taken_name') }
        let(:auth_user) { current_user }
        let!(:other_user) { create(:user, username: 'already_used') }
        let(:user) { { user: { username: other_user.username } } }

        run_test!
      end
    end
  end
end
