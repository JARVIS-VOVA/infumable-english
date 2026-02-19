# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/sessions', type: :request do
  let(:auth_user) { nil }

  before { sign_in auth_user if auth_user }

  path '/api/v1/sessions' do
    post '#create' do
      tags 'Sessions'
      consumes 'application/json'
      parameter name: :session, in: :body, schema: {
        type: :object,
        properties: {
          session: {
            type: :object,
            properties: {
              email: { type: :string },
              password: { type: :string }
            },
            required: %w[email password]
          }
        },
        required: ['session']
      }

      response 200, 'session created' do
        let(:existing_user) { create(:user, password: 'password123') }
        let(:session) { { session: { email: existing_user.email, password: 'password123' } } }

        run_test!
      end

      response 422, 'invalid credentials' do
        let(:session) { { session: { email: 'missing@example.com', password: 'invalid' } } }

        run_test!
      end
    end

    get '#show' do
      tags 'Sessions'
      produces 'application/json'

      response 200, 'authenticated' do
        let(:current_user) { create(:user) }
        let(:auth_user) { current_user }

        run_test! do |response|
          payload = JSON.parse(response.body, symbolize_names: true)
          expect(payload[:authenticated]).to be(true)
        end
      end

      response 200, 'not authenticated' do
        run_test! do |response|
          payload = JSON.parse(response.body, symbolize_names: true)
          expect(payload[:authenticated]).to be(false)
        end
      end
    end

    delete '#destroy' do
      tags 'Sessions'

      response 200, 'session destroyed' do
        let(:current_user) { create(:user) }
        let(:auth_user) { current_user }

        run_test!
      end

      response 401, 'unauthorized' do
        run_test!
      end
    end
  end
end
