# frozen_string_literal: true

module SimpleCovSetup
  class SafeCodecovFormatter
    def format(result)
      SimpleCov::Formatter::Codecov.new.format(result)
    rescue StandardError => e
      warn "Codecov upload failed: #{e.class}: #{e.message}"
    end
  end

  module_function

  def disabled_for_swagger?
    ENV['SIMPLECOV_DISABLED_BY_SWAGGER'].to_s == 'true'
  end

  def configure_formatter
    SimpleCov.formatter = SimpleCov::Formatter::HTMLFormatter
    return if ENV['CODECOV_TOKEN'].to_s.strip.empty?

    require 'codecov'

    SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter.new([
      SimpleCov::Formatter::HTMLFormatter,
      SafeCodecovFormatter
    ])
  end
end
