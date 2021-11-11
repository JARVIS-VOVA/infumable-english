# frozen_string_literal: true

class TagsQuery
  def initialize(tags = Tag.all)
    @tags = tags
  end

  def call(params)
    filter_user_id(params[:user_id])
    sort
  end

  def filter_user_id(user_id)
    return unless user_id

    @tags.where(user_id: user_id)
  end

  def sort
    @tags.order(created_at: :desc)
  end
end
