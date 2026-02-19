# frozen_string_literal: true

class Api::V1::TermsController < ApplicationController
  def index
    terms_scope = TermsQuery.new(current_user: current_user, options: query_options).call
    terms, pagination_meta = paginate(terms_scope)

    render json: {
      data: TermBlueprint.render_as_hash(terms),
      meta: pagination_meta
    }, status: :ok
  end

  def create
    terms_payload = create_params
    source_ids = terms_payload.map { |term_data| term_data[:source_id].to_i }.uniq
    sources_by_id = current_user.sources.where(id: source_ids).index_by(&:id)

    if (source_ids - sources_by_id.keys).any?
      return head :forbidden
    end

    @terms = []
    Term.transaction do
      terms_payload.each do |term_data|
        next if term_data[:phrase].blank? && term_data[:meaning].blank?

        @terms << current_user.terms.create!(
          source: sources_by_id.fetch(term_data[:source_id].to_i),
          phrase: normalized_text(term_data[:phrase]),
          meaning: normalized_text(term_data[:meaning])
        )
      end
    end

    if @terms.empty?
      return render json: { errors: ['At least one non-empty row is required'] }, status: :unprocessable_entity
    end

    render json: TermBlueprint.render_as_hash(@terms), status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def show
    term = Term.find(params[:id])
    render json: TermBlueprint.render_as_hash(term), status: :ok
  end

  def update
    term = current_user.terms.find(params[:id])
    if term.update(update_params)
      return render json: TermBlueprint.render_as_hash(term), status: :accepted
    end

    render json: { errors: term.errors.full_messages }, status: :unprocessable_entity
  end

  def destroy
    term = current_user.terms.find(params[:id])
    if term.destroy
      return head :ok
    end

    render json: { errors: term.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def create_params
    if params[:terms]
      return params.require(:terms).map { |term| term.permit(:phrase, :meaning, :source_id) }
    end

    [params.require(:term).permit(:phrase, :meaning, :source_id)]
  end

  def normalized_text(value)
    text = value.to_s.strip
    text.presence
  end

  def update_params
    params.require(:term).permit(:phrase, :meaning, :source_id, :learnt)
  end

  def query_options
    options = params.permit(:user_id, :source_id)
    options[:learnt] = params[:learnt] if params.key?(:learnt)
    options[:limit] = per_page_param if options[:source_id].present?
    options
  end

  def per_page_param
    per_page = params[:per_page].presence || 20
    per_page.to_i
  end
end
