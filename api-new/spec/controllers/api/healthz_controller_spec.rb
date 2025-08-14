# frozen_string_literal: true

RSpec.describe Api::HealthzController, type: :controller do
  describe 'GET #show' do
    context 'when checking health status' do
      before { get :show }

      it 'returns HTTP success status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns plain text response' do
        expect(response.content_type).to eq('text/plain; charset=utf-8')
      end

      it 'returns OK message' do
        expect(response.body).to eq('OK')
      end
    end
  end
end
