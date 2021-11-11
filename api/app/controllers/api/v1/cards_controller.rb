# frozen_string_literal: true

class Api::V1::CardsController < ApplicationController
  def index
    @cards = CardsQuery.new.call(filter_params)
    render 'api/cards/collection', status: :ok
  end

  def create
    @card = current_user.cards.new(card_params)
    return render 'api/cards/object', status: :created if @card.save

    render json: { error: @card.errors.full_messages }, status: :unprocessable_entity
  end

  def show
    @card = Card.find(params[:id])
    render 'api/cards/object', status: :ok
  end

  def update
    @card = current_user.cards.find(params[:id])
    return render 'api/cards/object', status: :accepted if @card.update(card_params)

    render json: { error: @card.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @card = current_user.cards.find(params[:id])
    return head :ok if @card.destroy

    render json: { error: @card.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def card_params
    params.require(:card).permit(:origin, :translate)
  end

  def filter_params
    params.permit(:user_id)
  end
end
