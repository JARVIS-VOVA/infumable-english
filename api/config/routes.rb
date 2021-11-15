# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  devise_for :users, skip: :all
  namespace :api do
    namespace :v1 do
      resources :users, only: %w[index create show]
      resource :sessions, only: %w[create show destroy]
      resources :cards, only: %w[index create show update destroy]
      resources :tags, only: %w[index create show update destroy]
    end
  end
end
