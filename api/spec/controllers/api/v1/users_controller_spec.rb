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

    it 'user.id should be present' do
      expect_json_types(id: :integer)
    end

    it 'user.created_at should be present' do
      expect_json_types(created_at: :string)
    end

    it 'user should be present' do
      expect_json({
        email: user_params[:user][:email],
        username: user_params[:user][:username],
      })
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
