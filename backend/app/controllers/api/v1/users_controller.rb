# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index create show]

  def index
    @users = User.all
    render 'api/users/collection', status: :ok
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(:user, @user)
      return head :created
    end
    render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
  end

  def show
    @user = User.find(params[:id])
    render 'api/users/object', status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end
end
