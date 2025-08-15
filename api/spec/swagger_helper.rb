# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  config.openapi_root = Rails.root.join('swagger').to_s

  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'API V1',
        version: 'v1'
      },
      paths: {},
      servers: [
        {
          url: 'http://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'localhost:3000'
            }
          }
        }
      ],
      components: {
        schemas: {
          user: {
            type: :object,
            properties: {
              id: { type: :integer, example: 3 }, # rand(1..10)
              username: { type: :string, example: 'Marry Poppins' }, # FFaker::Internet.user_name
              email: { type: :string, example: 'user@example.com' }, # FFaker::Internet.email
              created_at: { type: :datatime, example: Time.new(1_636_311_796) } # Time.now
            },
            required: %w[id username email created_at]
          },
          new_user: {
            type: :object,
            properties: {
              user: {
                type: :object,
                properties: {
                  username: { type: :string, example: 'Marry Poppins' }, # FFaker::Internet.user_name
                  email: { type: :string, example: 'user@example.com' }, # FFaker::Internet.email
                  password: { type: :string, example: 'password', min_length: 6, max_length: 128 },
                  password_confirmation: { type: :string, example: 'password', min_length: 6, max_length: 128 }
                },
                required: %w[username email password password_confirmation]
              }
            },
            required: %w[user]
          }
        }
      }
    }
  }

  config.openapi_format = :yaml
end
