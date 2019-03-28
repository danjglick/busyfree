Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users

  namespace :api do
    namespace :v1 do
      resources :users
    end
  end

  root :to => redirect('users/1')
end
