# frozen_string_literal: true

module ControllerSpecHelper
  def json_response(res = nil)
    JSON.parse(res&.body || response.body, symbolize_names: true)
  end
end
