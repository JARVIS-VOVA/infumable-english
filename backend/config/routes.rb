Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  devise_for :users, skip: :all

  get 'up', to: 'rails/health#show', as: :rails_health_check

  namespace :api do
    get '/healthz', to: 'healthz#show'

    namespace :v1 do
      resources :users, only: %w[index create show]
      resource :current_user, only: %w[show update]
      resource :sessions, only: %w[create show destroy]
      resources :terms, only: %w[index create show update destroy]
      resources :sources, only: %w[index create show update destroy] do
        collection do
          get :public, action: :public_index
        end
        member do
          post :clone
          post :analyze
        end
      end
    end
  end
end
