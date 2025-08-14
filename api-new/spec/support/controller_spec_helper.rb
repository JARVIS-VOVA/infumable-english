# frozen_string_literal: true

module ControllerSpecHelper
  def json_response
    @json_response ||= JSON.parse(response.body, symbolize_names: true)
  end
end
