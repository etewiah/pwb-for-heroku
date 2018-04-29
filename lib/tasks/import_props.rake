# desc "Explaining what the task does"
# task :pw_be do
#   # Task goes here
# end
require 'pw_be/importer'
# from root of engine:
# bundle exec rake app:pw_be:db:seed
# from spec/dummy folder or within an app using the engine:
# bundle exec rake pw_be:db:seed
namespace :pw_be do
  desc 'Imports property data from urls defined in the /db/import_sources directory.'
    # bundle exec rake pw_be:import_from_urls
  task import_from_urls: [:environment] do
    PwBe::Importer.import!
  end
end
