# frozen_string_literal: true

class Api::V1::TermsController < ApplicationController
  def index
    @terms = TermsQuery.new(current_user: current_user, options: filter_params).call
    render 'api/terms/collection', status: :ok
  end

  def create
    ActiveRecord::Base.transaction do
      terms_data = create_params

      @terms = terms_data.map do |term_data|
        tags_data = term_data.delete(:tags) || []
        term = current_user.terms.create!(term_data)
        tags = tags_data.map { |tag_title| current_user.tags.find_by(title: tag_title) }
        tags.each do |tag|
          current_user.term_tags.create!(tag: tag, term: term)
        end
        term
      end
    end

    render 'api/terms/collection', status: :created
  end

  def show
    @term = Term.find(params[:id])
    render 'api/terms/object', status: :ok
  end

  def update
    @term = current_user.terms.find(params[:id])
    return render 'api/terms/object', status: :accepted if @term.update(update_params)

    render json: { errors: @term.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    @term = current_user.terms.find(params[:id])
    return head :ok if @term.destroy

    render json: { errors: @term.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def create_params
    params.require(:terms).map do |term|
      term.permit(:phrase, :meaning, tags: [])
    end
  end

  def update_params
    params.require(:term).permit(:phrase, :meaning, :tags)
  end

  def filter_params
    params.permit(:user_id)
  end
end
