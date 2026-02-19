# frozen_string_literal: true

class Api::V1::CurrentUsersController < ApplicationController
  def show
    render json: UserBlueprint.render_as_hash(current_user), status: :ok
  end

  def update
    if current_user.update(current_user_params)
      return render json: UserBlueprint.render_as_hash(current_user), status: :ok
    end

    render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def current_user_params
    params.require(:user).permit(:username)
  end
end
