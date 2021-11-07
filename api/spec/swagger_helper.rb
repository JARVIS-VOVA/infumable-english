# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.swagger_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under swagger_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a swagger_doc tag to the
  # the root example_group in your specs, e.g. describe '...', swagger_doc: 'v2/swagger.json'
  config.swagger_docs = {
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
              createdAt: { type: :datatime, example: Time.new(1_636_311_796) } # Time.now
            },
            required: %w[id username email createdAt]
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

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The swagger_docs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.swagger_format = :yaml
end
