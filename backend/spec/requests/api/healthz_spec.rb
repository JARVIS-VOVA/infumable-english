# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/healthz', type: :request do
  path '/api/healthz' do
    get '#show' do
      tags 'Health'
      produces 'text/plain'

      response 200, 'service healthy' do
        run_test! do |response|
          expect(response.body).to eq('OK')
        end
      end
    end
  end
end
