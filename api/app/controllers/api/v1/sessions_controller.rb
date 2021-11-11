# frozen_string_literal: true

class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[create]

  def show
    @user = current_user
    render 'api/users/object', status: :ok
  end

  def create
    @user = User.find_by(email: user_params[:email])
    if @user&.valid_password?(user_params[:password])
      sign_in(:user, @user)
      return render 'api/users/object', status: :created
    end
    render json: { error: I18n.t('devise.failure.not_found_in_database', authentication_keys: :email) },
           status: :unprocessable_entity
  end

  def destroy
    reset_session
    head :ok
  end

  private

  def user_params
    params.require(:session).permit(:email, :password)
  end
end
