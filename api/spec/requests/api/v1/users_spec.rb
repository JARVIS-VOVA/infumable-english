# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/users', type: :request do
  path '/api/v1/users' do
    get '#index' do
      tags 'Users'
      consumes 'application/json'

      response 200, 'successful return all users' do
        let!(:user) { create(:user) }
        run_test! do |response|
          # TODO: Move next line to helpers
          data = JSON.parse(response.body, symbolize_names: true)
          expect(data.last[:id]).to eq(user.id)
        end
      end
    end

    post '#create' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/new_user' }

      response 201, 'successful user created' do
        let(:user) do
          {
            user: {
              email: 'email@example.com',
              password: 'password',
              username: 'Mary Poppins'
            }
          }
        end

        run_test! do |response|
          # TODO: Move next line to helpers
          data = JSON.parse(response.body, symbolize_names: true)
          expect(data[:email]).to eq(user[:user][:email])
        end
      end

      response '422', 'invalid request' do
        let(:user) { { user: { email: 'invalid' } } }
        run_test!
      end
    end
  end

  path '/api/v1/users/{id}' do
    get '#show' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string

      response '200', 'user found' do
        schema '$ref' => '#/components/schemas/user'

        let(:user) { create(:user) }
        let(:id) { user.id }

        run_test!
      end

      response '404', 'user not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
