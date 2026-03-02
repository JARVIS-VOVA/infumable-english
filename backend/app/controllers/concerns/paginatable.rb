# frozen_string_literal: true

module Paginatable
  extend ActiveSupport::Concern
  include Pagy::Method

  def paginate(scope, default_per_page: 20, max_per_page: 100)
    requested_page = params[:page].to_i
    requested_page = 1 if requested_page <= 0

    pagy_obj, records = pagy(
      :offset,
      scope,
      limit: default_per_page,
      client_max_limit: max_per_page
    )

    if requested_page > 1 && pagy_obj.in.zero? && pagy_obj.last.positive?
      pagy_obj, records = pagy(
        :offset,
        scope,
        page: pagy_obj.last,
        limit: pagy_obj.limit,
        client_max_limit: max_per_page
      )
    end

    [records, pagination_meta(pagy_obj)]
  end

  private

  def pagination_meta(pagy)
    {
      current_page: pagy.page,
      next_page:    pagy.next,
      prev_page:    pagy.previous,
      total_pages:  pagy.last,
      total_count:  pagy.count,
      per_page:     pagy.limit
    }
  end
end
