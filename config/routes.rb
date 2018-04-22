Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount Pwb::Engine => '/'
  mount PropertyWebScraper::Engine => '/io/'

  authenticate :user do
    get '/mgmt' => 'mgmt#show'
  end


end
