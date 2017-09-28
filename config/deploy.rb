# config valid only for current version of Capistrano
lock "3.9.1"


# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5




# require 'capistrano-db-tasks'

# if you haven't already specified
set :rails_env, "production"

# if you want to remove the local dump file after loading
# set :db_local_clean, true

# if you want to remove the dump file from the server after downloading
# set :db_remote_clean, true

# if you want to exclude table from dump
# set :db_ignore_tables, []

# if you want to exclude table data (but not table schema) from dump
# set :db_ignore_data_tables, []

# set :repo_url, "git@example.com:me/my_repo.git"

set :application, 'pwb_demo_server'
set :repo_url, 'https://github.com/etewiah/pwb-for-heroku.git'
set :branch, 'digital-ocean-deploy'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/www/pwb_demo'

# I think below would copy directly instead of using git
# set :deploy_via, :copy

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# have to keep it false cos of a bug in capistrano-sidekiq
# https://github.com/seuros/capistrano-sidekiq
set :pty, false

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 2

# set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.3.3'

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end


# https://gist.github.com/andrey-skat/10399224
namespace :deploy do
  namespace :assets do

    Rake::Task['deploy:assets:precompile'].clear_actions

    desc 'Precompile assets locally and upload to servers'
    task :precompile do
      on roles(fetch(:assets_roles)) do
        run_locally do
          with rails_env: fetch(:rails_env) do
            execute 'bin/rake assets:precompile'
          end
        end

        within release_path do
          with rails_env: fetch(:rails_env) do
            # old_manifest_path = "#{shared_path}/public/assets/manifest*"
            old_manifest_path = "#{shared_path}/public/assets/.sprockets-manifest*"
            execute :rm, old_manifest_path if test "[ -f #{old_manifest_path} ]"
            # binding.pry
            upload!('./public/assets/', "#{shared_path}/public/", recursive: true)
          end
        end

        # run_locally { execute 'rm -rf public/assets' }
      end
    end

  end
end



# https://gist.github.com/twetzel/66de336327f79beac0e0
# Clear existing task so we can replace it rather than "add" to it.
# Rake::Task["deploy:compile_assets"].clear 

# namespace :deploy do
  
#   desc 'Compile assets'
#   task :compile_assets => [:set_rails_env] do
#     # invoke 'deploy:assets:precompile'
#     invoke 'deploy:assets:precompile_local'
#     invoke 'deploy:assets:backup_manifest'
#   end
  
  
#   namespace :assets do
    
#     desc "Precompile assets locally and then rsync to web servers" 
#     task :precompile_local do 
#       # compile assets locally
#       run_locally do
#         execute "RAILS_ENV=#{fetch(:stage)} bundle exec rake assets:precompile"
#       end

#       # rsync to each server
#       local_dir = "./public/assets/"
#       # on roles( fetch(:assets_roles, [:web]) ) do
#       on roles( fetch(:assets_roles) ) do
#         # this needs to be done outside run_locally in order for host to exist
#         remote_dir = "#{host.user}@#{host.hostname}:#{release_path}/public/assets/"
    
#         run_locally { execute "rsync -av --delete #{local_dir} #{remote_dir}" }
#       end

#       # clean up
#       run_locally { execute "rm -rf #{local_dir}" }
#     end
#   end
# end


 # https://gist.github.com/toobulkeh/8214198
namespace :rails do


  # http://monksealsoftware.com/run-rake-tasks-on-the-server-with-capistrano-3-and-rbenv/
  #   bundle exec cap production rails:invoke task=chattymaps:read_in_ember_meetdownhub
  desc 'Invoke rake task on the server'
  task :invoke do
    fail 'no task provided' unless ENV['task']

    on roles(:app) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          execute :rake, ENV['task']
        end
      end
    end
  end

  desc 'Open the rails console on the primary remote server'
  task :console do
    on roles(:app), primary: true do |host|
      command = "/home/#{host.user}/.rbenv/shims/ruby #{deploy_to}/current/bin/rails console #{fetch(:stage)}"
      # binding.pry
      # if ".ruby-version" file is not available in current dir, might need to run "rbenv local 2.2.3"
      exec "ssh -l #{host.user} #{host.hostname} -p 22 -t 'cd #{deploy_to}/current && #{command}'"
    end
  end


  # desc "Open the rails console on each of the remote servers"
  # task :console do
  #   on roles(:app).first do |host| #does it for the first host.
  #     rails_env = fetch(:stage)
  #     execute_interactively "ruby #{current_path}/script/rails console #{rails_env}"
  #   end
  # end

  desc "Open the rails dbconsole on each of the remote servers"
  task :dbconsole do
    on roles(:db).first do |host| #does it for the first host.
      rails_env = fetch(:stage)
      execute_interactively "ruby #{current_path}/script/rails dbconsole #{rails_env}"
    end
  end

  def execute_interactively(command)
    user = fetch(:user)
    port = fetch(:port) || 22
    exec "ssh -l #{user} #{host} -p #{port} -t 'cd #{deploy_to}/current && #{command}'"
  end
end
