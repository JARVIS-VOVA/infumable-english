# frozen_string_literal: true

class TagsQuery
  def initialize(current_user:, options: {})
    @current_user = current_user
    @options = options
    @tags = Tag.all
  end

  def call
    filter_user_id
    sort
  end

  def filter_user_id
    user_id = @options[:user_id] || @current_user.id
    return unless user_id

    @tags.where(user_id: user_id)
  end

  def sort
    @tags.order(created_at: :desc)
  end
end
