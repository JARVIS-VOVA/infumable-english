# frozen_string_literal: true

require 'rabl'

Rabl.configure do |config|
  config.include_json_root = false
end
