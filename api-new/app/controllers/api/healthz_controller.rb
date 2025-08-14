# frozen_string_literal: true

class Api::HealthzController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    render plain: 'OK', status: :ok
  end
end
