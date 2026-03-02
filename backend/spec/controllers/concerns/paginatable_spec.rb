# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Paginatable, type: :controller do
  paginatable_concern = described_class

  controller(ApplicationController) do
    include paginatable_concern
  end

  describe '#paginate' do
    let(:scope) { instance_double(ActiveRecord::Relation) }

    it 'returns first pagy result when page is in range' do
      pagy_obj = instance_double(Pagy::Offset, in: 1, page: 1, last: 3, count: 50, limit: 20, next: 2, previous: nil)
      records = %w[a b]

      allow(controller).to receive_messages(params: ActionController::Parameters.new(page: 1), pagy: [pagy_obj, records])

      returned_records, meta = controller.send(:paginate, scope)

      expect(controller).to have_received(:pagy)
        .with(:offset, scope, limit: 20, client_max_limit: 100)
        .once
      expect(returned_records).to eq(records)
      expect(meta).to include(
        current_page: 1,
        total_pages: 3,
        total_count: 50,
        per_page: 20
      )
    end

    it 'falls back to the last page when requested page is out of range' do
      allow(controller).to receive(:params).and_return(ActionController::Parameters.new(page: 999))

      first_pagy = instance_double(Pagy::Offset, in: 0, limit: 20, page: 999, last: 3, count: 50, next: nil, previous: 3)
      first_records = []

      last_page_pagy = instance_double(Pagy::Offset, in: 1, limit: 20, page: 3, last: 3, count: 50, next: nil, previous: 2)
      last_page_records = %w[c]

      allow(controller).to receive(:pagy).and_return([first_pagy, first_records], [last_page_pagy, last_page_records])

      returned_records, meta = controller.send(:paginate, scope)

      expect(controller).to have_received(:pagy)
        .with(:offset, scope, limit: 20, client_max_limit: 100)
        .once
      expect(controller).to have_received(:pagy)
        .with(:offset, scope, page: 3, limit: 20, client_max_limit: 100)
        .once
      expect(
        [returned_records, meta.slice(:current_page, :prev_page, :next_page, :total_pages)]
      ).to eq(
        [last_page_records, { current_page: 3, prev_page: 2, next_page: nil, total_pages: 3 }]
      )
    end
  end
end
