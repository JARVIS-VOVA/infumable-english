# frozen_string_literal: true

class Api::V1::CardsController < BaseController
  def index
    @cards = Card.all
    render 'api/cards/collection', status: :ok
  end

  def create
    @card = Card.new(card_params)
    return render 'api/cards/object', status: :created if @card.save

    render json: { errors: @card.errors.full_message }, status: :unprocessable_entity
  end

  def show
    @card = Card.find(params[:id])
    render 'api/cards/object', status: :ok
  end

  def update
    @card = Card.find(params[:id])
    return render 'api/cards/object', status: :accepted if @card.update(card_params)

    render json: { errors: @card.errors.full_message }, status: :unprocessable_entity
  end

  def destroy
    @card = Card.find(params[:id])
    return head :ok if @card.destroy

    render json: { errors: @card.errors.full_message }, status: :unprocessable_entity
  end

  private

  def card_params
    params.require(:card).permit(:origin, :translate)
  end
end
