# frozen_string_literal: true

RSpec.describe Api::V1::CurrentUsersController, type: :controller do
  describe '#show' do
    let(:user) { create(:user) }

    before do
      sign_in(user)
      get :show
    end

    it 'returns ok' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns current user id' do
      expect(json_response[:id]).to eq(user.id)
    end

    it 'returns current user email' do
      expect(json_response[:email]).to eq(user.email)
    end

    it 'returns current user username' do
      expect(json_response[:username]).to eq(user.username)
    end
  end

  describe '#update' do
    let(:user) { create(:user, username: 'old_name') }

    before do
      sign_in(user)
    end

    it 'updates username' do
      patch :update, params: { user: { username: 'new_name' } }

      expect(user.reload.username).to eq('new_name')
    end

    it 'returns ok after username update' do
      patch :update, params: { user: { username: 'new_name' } }

      expect(response).to have_http_status(:ok)
    end

    it 'returns unprocessable entity when username already exists' do
      create(:user, username: 'taken_name')

      patch :update, params: { user: { username: 'taken_name' } }

      expect(response).to have_http_status(:unprocessable_content)
    end

    it 'returns validation error when username already exists' do
      create(:user, username: 'taken_name')

      patch :update, params: { user: { username: 'taken_name' } }

      expect(json_response[:errors]).to include('Username has already been taken')
    end
  end
end
