# frozen_string_literal: true

require 'simplecov'
require_relative 'support/simplecov_setup'

unless SimpleCovSetup.disabled_for_swagger?
  SimpleCov.minimum_coverage 100
  SimpleCov.start
  SimpleCovSetup.configure_formatter
end

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
