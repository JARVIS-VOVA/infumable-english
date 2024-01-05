# frozen_string_literal: true

class Api::V1::TagsController < ApplicationController
  def index
    @tags = TagsQuery.new.call(filter_params)
    render 'api/tags/collection', status: :ok
  end

  def create
    @tag = current_user.tags.new(tag_params)
    return render 'api/tags/object', status: :created if @tag.save

    render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
  end

  def show
    @tag = Tag.find(params[:id])
    render 'api/tags/object', status: :ok
  end

  def update
    @tag = current_user.tags.find(params[:id])
    return render 'api/tags/object', status: :accepted if @tag.update(tag_params)

    render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @tag = current_user.tags.find(params[:id])
    return head :ok if @tag.destroy

    render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def tag_params
    params.require(:tag).permit(:title, :color)
  end

  def filter_params
    params.permit(:user_id)
  end
end
