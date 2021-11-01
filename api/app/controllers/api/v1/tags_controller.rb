# frozen_string_literal: true

class Api::V1::TagsController < ApplicationController
  def index
    @tags = Tag.all
    render 'api/tags/collection', status: :ok
  end

  def create
    @tag = Tag.new(tag_params)
    return render 'api/tags/object', status: :created if @tag.save

    render json: { error: @tag.errors.full_messages }, status: :unprocessable_entity
  end

  def show
    @tag = Tag.find(params[:id])
    render 'api/tags/object', status: :ok
  end

  def update
    @tag = Tag.find(params[:id])
    return render 'api/tags/object', status: :accepted if @tag.update(tag_params)

    render json: { error: @tag.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @tag = Tag.find(params[:id])
    return head :ok if @tag.destroy

    render json: { error: @tag.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def tag_params
    params.require(:tag).permit(:origin, :translate)
  end
end
