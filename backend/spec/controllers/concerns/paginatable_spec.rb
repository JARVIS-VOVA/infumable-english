# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Paginatable, type: :controller do
  controller(ApplicationController) do
    include Paginatable
  end

  describe '#paginate' do
    let(:scope) { double('scope') }

    it 'returns first pagy result when page is in range' do
      allow(controller).to receive(:params).and_return(ActionController::Parameters.new(page: 1))

      pagy_obj = double('Pagy', in: 1, pages: 3, page: 1, last: 3, count: 50, limit: 20)
      allow(pagy_obj).to receive(:instance_variable_get).with(:@next).and_return(2)
      allow(pagy_obj).to receive(:instance_variable_get).with(:@prev).and_return(nil)
      records = %w[a b]

      expect(controller).to receive(:pagy)
        .with(:offset, scope, limit: 20, client_max_limit: 100)
        .once
        .and_return([pagy_obj, records])

      returned_records, meta = controller.send(:paginate, scope)

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

      first_pagy = double('Pagy', in: 0, pages: 3, limit: 20, page: 999, last: 3, count: 50)
      allow(first_pagy).to receive(:instance_variable_get).with(:@next).and_return(nil)
      allow(first_pagy).to receive(:instance_variable_get).with(:@prev).and_return(nil)
      first_records = []

      last_page_pagy = double('Pagy', in: 1, pages: 3, limit: 20, page: 3, last: 3, count: 50)
      allow(last_page_pagy).to receive(:instance_variable_get).with(:@next).and_return(nil)
      allow(last_page_pagy).to receive(:instance_variable_get).with(:@prev).and_return(2)
      last_page_records = %w[c]

      expect(controller).to receive(:pagy)
        .with(:offset, scope, limit: 20, client_max_limit: 100)
        .ordered
        .and_return([first_pagy, first_records])
      expect(controller).to receive(:pagy)
        .with(:offset, scope, page: 3, limit: 20, client_max_limit: 100)
        .ordered
        .and_return([last_page_pagy, last_page_records])

      returned_records, meta = controller.send(:paginate, scope)

      expect(returned_records).to eq(last_page_records)
      expect(meta).to include(
        current_page: 3,
        prev_page: 2,
        next_page: nil,
        total_pages: 3
      )
    end
  end
end
