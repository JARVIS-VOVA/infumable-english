# frozen_string_literal: true

RSpec.describe Api::V1::UsersController, type: :controller do
  describe '#index' do
    let!(:user) { create(:user) }

    before do
      get :index
    end

    it 'status should be correct' do
      expect(response).to have_http_status(:ok)
    end

    it 'user should be present' do
      expect_json([{
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at.utc.to_s
      }])
    end
  end

  describe '#create' do
    let(:user_data) { build(:user) }
    let(:user_params) do
      {
        user: {
          email: user_data.email,
          username: user_data.username,
          password: user_data.password,
          # password_confirmation: 'password' # optional
        }
      }
    end

    before do
      post :create, params: user_params
    end

    it 'status should be correct' do
      expect(response).to have_http_status(:created)
    end

    it 'sets current_user' do
      expect(controller.current_user).to be_present
    end

    it 'assigns the correct email to current_user' do
      expect(controller.current_user.email).to eq(user_params[:user][:email])
    end

    it 'assigns the correct username to current_user' do
      expect(controller.current_user.username).to eq(user_params[:user][:username])
    end

    it 'sets a non-empty session' do
      expect(session).to_not be_empty
    end
  end

  describe '#show' do
    let!(:user) { create(:user) }

    before do
      get :show, params: { id: user.id }
    end

    it 'status should be correct' do
      expect(response).to have_http_status(:ok)
    end

    it 'user should be present' do
      expect_json({
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at.utc.to_s
      })
    end
  end
end
