# frozen_string_literal: true

class Api::V1::SourcesController < ApplicationController
  def index
    sources_scope = current_user.sources.includes(:terms, :user).order(created_at: :desc)
    sources, pagination_meta = paginate(sources_scope)

    render json: {
      data: SourceBlueprint.render_as_hash(sources),
      meta: pagination_meta
    }, status: :ok
  end

  def create
    @source = current_user.sources.new(source_params)
    text = source_text_param

    if @source.save
      SourceProcessor.new(text: text, source_id: @source.id).call if text.present?
      @source.reload
      return render json: SourceBlueprint.render_as_hash(@source, view: :with_terms), status: :created
    end

    render json: { errors: @source.errors.full_messages }, status: :unprocessable_content
  end

  def show
    source = Source.includes(:terms, :user).find(params[:id])
    return head :forbidden unless source.user_id == current_user.id || source.is_public?

    render json: SourceBlueprint.render_as_hash(source, view: :with_terms), status: :ok
  end

  def update
    source = current_user.sources.find(params[:id])

    if source.update(update_params)
      return render json: SourceBlueprint.render_as_hash(source), status: :accepted
    end

    render json: { errors: source.errors.full_messages }, status: :unprocessable_content
  end

  def destroy
    source = current_user.sources.find(params[:id])

    if source.destroy
      return head :no_content
    end

    render json: { errors: source.errors.full_messages }, status: :unprocessable_content
  end

  def public_index
    sources_scope = Source.publicly_available.includes(:terms, :user).order(created_at: :desc)
    sources, pagination_meta = paginate(sources_scope)

    render json: {
      data: SourceBlueprint.render_as_hash(sources),
      meta: pagination_meta
    }, status: :ok
  end

  def clone
    source = Source.find(params[:id])
    return head :forbidden unless source.user_id == current_user.id || source.is_public?

    copied_source = source.copy_to_user(current_user)
    render json: SourceBlueprint.render_as_hash(copied_source, view: :with_terms), status: :created
  end

  def analyze
    source = current_user.sources.find(params[:id])
    text = params.require(:source).permit(:text)[:text].to_s

    SourceProcessor.new(text: text, source_id: source.id).call
    source.reload

    render json: SourceBlueprint.render_as_hash(source, view: :with_terms), status: :ok
  end

  private

  def source_params
    params.require(:source).permit(:title, :is_public)
  end

  def source_text_param
    params.require(:source).permit(:text)[:text].to_s
  end

  def update_params
    params.require(:source).permit(:title, :is_public)
  end
end
