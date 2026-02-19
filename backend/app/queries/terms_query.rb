# frozen_string_literal: true

class TermsQuery
  def initialize(current_user:, options: {})
    @current_user = current_user
    @options = options
    @terms = Term.all
  end

  def call
    filter_by_user
    filter_by_source
    filter_by_learnt
    sort
    limit
  end

  def filter_by_user
    user_id = @options[:user_id] || @current_user.id
    return unless user_id

    @terms = @terms.where(user_id: user_id)
  end

  def filter_by_source
    return if @options[:source_id].blank?

    @terms = @terms.where(source_id: @options[:source_id])
  end

  def filter_by_learnt
    return unless @options.key?(:learnt)

    @terms = @terms.where(learnt: @options[:learnt])
  end

  def sort
    @terms = @terms.order(priority: :desc, created_at: :desc)
  end

  def limit
    return @terms unless limit_value

    @terms = @terms.limit(limit_value)
  end

  def limit_value
    return @options[:limit].to_i if @options[:limit].present?
    return 20 if @options[:source_id].present?

    nil
  end
end
