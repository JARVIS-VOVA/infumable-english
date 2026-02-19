# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Paginatable

  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique

  private

  def authenticate_user!
    head :unauthorized unless signed_in?
  end

  def not_found
    head :not_found
  end

  def record_not_unique
    render json: { errors: ['Record has already been taken'] }, status: :unprocessable_entity
  end
end
