# frozen_string_literal: true

class CardsQuery
  def initialize(cards = Card.all)
    @cards = cards
  end

  def call(params)
    filter_user_id(params[:user_id])
    sort
  end

  def filter_user_id(user_id)
    return unless user_id

    @cards.where(user_id: user_id)
  end

  def sort
    @cards.order(created_at: :desc)
  end
end
