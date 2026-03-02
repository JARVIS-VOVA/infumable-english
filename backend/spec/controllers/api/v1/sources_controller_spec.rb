# frozen_string_literal: true

RSpec.describe Api::V1::SourcesController, type: :controller do
  describe '#destroy' do
    let(:user) { create(:user) }
    let(:source) { Source.create!(user: user, title: 'Undeletable source') }
    let(:errors) { ['Cannot delete source'] }

    before do
      sign_in(user)
      allow(controller).to receive(:current_user).and_return(user)

      sources_assoc = instance_double(ActiveRecord::Associations::CollectionProxy)
      allow(user).to receive(:sources).and_return(sources_assoc)
      allow(sources_assoc).to receive(:find).with(source.id.to_s).and_return(source)

      errors_obj = instance_double(ActiveModel::Errors, full_messages: errors)
      allow(source).to receive_messages(destroy: false, errors: errors_obj)
    end

    it 'returns unprocessable content when destroy fails' do
      delete :destroy, params: { id: source.id }

      expect(response).to have_http_status(:unprocessable_content)
    end

    it 'returns model errors when destroy fails' do
      delete :destroy, params: { id: source.id }

      expect(json_response[:errors]).to eq(errors)
    end
  end
end
