# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def authenticate_user!
    head :unauthorized unless signed_in?
  end

  def not_found
    head :not_found
  end
end
