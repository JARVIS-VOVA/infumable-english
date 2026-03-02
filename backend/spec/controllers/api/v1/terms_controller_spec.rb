# frozen_string_literal: true

RSpec.describe Api::V1::TermsController, type: :controller do
  describe '#create' do
    let(:user) { create(:user) }
    let(:source) { Source.create!(user: user, title: 'My source') }

    before do
      sign_in(user)
      allow(controller).to receive(:current_user).and_return(user)
    end

    it 'returns unprocessable content with validation errors when create! raises RecordInvalid' do
      invalid_term = Term.new(user: user, source: source, phrase: nil, meaning: nil, priority: 1)
      invalid_term.validate
      exception = ActiveRecord::RecordInvalid.new(invalid_term)

      allow(user.terms).to receive(:create!).and_raise(exception)

      post :create, params: { term: { phrase: 'hola', source_id: source.id } }

      expect(response).to have_http_status(:unprocessable_content)
      expect(json_response[:errors]).to include('Phrase or meaning must be present')
    end
  end

  describe '#update' do
    let(:user) { create(:user) }
    let(:source) { Source.create!(user: user, title: 'My source') }
    let(:term) { Term.create!(user: user, source: source, phrase: 'hola', meaning: 'hello') }

    before do
      sign_in(user)
    end

    it 'returns unprocessable content with validation errors when update fails' do
      patch :update, params: { id: term.id, term: { phrase: '', meaning: '' } }

      expect(response).to have_http_status(:unprocessable_content)
      expect(json_response[:errors]).to include('Phrase or meaning must be present')
    end
  end

  describe '#destroy' do
    let(:user) { create(:user) }
    let(:source) { Source.create!(user: user, title: 'My source') }
    let(:term) { Term.create!(user: user, source: source, phrase: 'hola', meaning: 'hello') }
    let(:errors) { ['Cannot delete term'] }

    before do
      sign_in(user)
      allow(controller).to receive(:current_user).and_return(user)

      terms_assoc = instance_double(ActiveRecord::Associations::CollectionProxy)
      allow(user).to receive(:terms).and_return(terms_assoc)
      allow(terms_assoc).to receive(:find).with(term.id.to_s).and_return(term)

      errors_obj = instance_double(ActiveModel::Errors, full_messages: errors)
      allow(term).to receive_messages(destroy: false, errors: errors_obj)
    end

    it 'returns unprocessable content with errors when destroy fails' do
      delete :destroy, params: { id: term.id }

      expect(response).to have_http_status(:unprocessable_content)
      expect(json_response[:errors]).to eq(errors)
    end
  end
end
