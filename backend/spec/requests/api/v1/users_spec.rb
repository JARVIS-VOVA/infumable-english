# frozen_string_literal: true

require 'swagger_helper'
require 'securerandom'

RSpec.describe 'api/v1/users', type: :request do
  path '/api/v1/users' do
    get '#index' do
      tags 'Users'
      consumes 'application/json'

      response 200, 'successful return all users' do
        let!(:user) { create(:user) }
        run_test! do |response|
          expect(json_response.map { |item| item[:id] }).to include(user.id)
        end
      end
    end

    post '#create' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: { '$ref' => '#/components/schemas/new_user' }

      response 201, 'successful user created' do
        let(:email) { "email_#{SecureRandom.hex(4)}@example.com" }
        let(:username) { "username_#{SecureRandom.hex(4)}" }
        let(:user) do
          {
            user: {
              email: email,
              password: 'password',
              username: username
            }
          }
        end

        run_test! do |response|
          expect(response.status).to eq(201)
          created_user = User.find_by(email: email)
          expect(created_user).to be_present
          expect(created_user.username).to eq(username)
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
