# frozen_string_literal: true

class Api::V1::TermTagsController < ApplicationController
  def create
    @term_tag = current_user.term_tags.new(term_tag_params)
    return render 'api/tags/object', status: :created if @term_tag.save

    render json: { errors: @term_tag.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @term_tag = current_user.term_tags.find(params[:id])
    return head :ok if @term_tag.destroy

    render json: { errors: @term_tag.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def term_tag_params
    params.require(:term_tag).permit(:term_id, :tag_id)
  end
end
