# frozen_string_literal: true

class Api::V1::CurrentUsersController < ApplicationController
  def show
    @user = current_user
    render 'api/users/object', status: :ok
  end
end
