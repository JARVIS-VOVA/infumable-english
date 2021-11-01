# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[create]

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(:user, @user)
      return render 'api/users/object', status: :created
    end
    render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
  end

  def show
    @user = params[:id] ? User.find(params[:id]) : current_user
    raise ActiveRecord::RecordNotFound unless @user

    render 'api/users/object', status: :created
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end
end
