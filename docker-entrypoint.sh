#!/bin/sh

# Run the DB in background
sudo -E -u postgres pg_ctl -D "$PGDATA" -o "-c listen_addresses=''" -w start

# Create the DB
if [ ! -f migration_done ]; then
    bundle exec rake db:migrate pwb:db:seed pwb:db:seed_pages property_web_scraper:db:seed && \
    touch migration_done
fi

# Run the app
rackup
