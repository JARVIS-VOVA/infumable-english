# frozen_string_literal: true

class Api::V1::CardsTagsController < ApplicationController
  def create
    @cards_tag = current_user.cards_tags.new(cards_tag_params)
    return render 'api/tags/object', status: :created if @cards_tag.save

    render json: { errors: @cards_tag.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @cards_tag = current_user.cards_tags.find(params[:id])
    return head :ok if @cards_tag.destroy

    render json: { errors: @cards_tag.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def cards_tag_params
    params.require(:cards_tag).permit(:card_id, :tag_id)
  end
end
