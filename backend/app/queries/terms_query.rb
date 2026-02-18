# frozen_string_literal: true

class TermsQuery
  def initialize(current_user:, options: {})
    @current_user = current_user
    @options = options
    @terms = Term.all.includes(:term_tags)
  end

  def call
    filter_user_id
    sort
  end

  def filter_user_id
    user_id = @options[:user_id] || @current_user.id
    return unless user_id

    @terms = @terms.where(user_id: user_id)
  end

  def sort
    @terms.order(created_at: :desc)
  end
end
