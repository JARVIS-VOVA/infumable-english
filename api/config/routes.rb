# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cards, only: %w[index create show update destroy]
      resources :tags, only: %w[index create show update destroy]
    end
  end
end
