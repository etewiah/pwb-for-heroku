FROM ruby:alpine

# https://www.chrisblunt.com/rails-on-docker-getting-started-docker-ruby-rails/
# https://hub.docker.com/_/ruby/

# Install app's runtime dependencies
RUN apk add -U tzdata git postgresql postgresql-client nodejs libffi-dev readline sqlite && \
    apk add --virtual build-deps build-base libc-dev linux-headers libxml2-dev libxslt-dev readline-dev postgresql-dev && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

# Bundle into the temp directory
WORKDIR /tmp
ADD Gemfile ./
RUN bundle install --jobs=2 && \
    apk del build-deps

# Copy the app's code into the container
ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

# Configure production environment variables
ENV RAILS_ENV=production \
    RACK_ENV=production \
    RAILS_LOG_TO_STDOUT=enabled \
    RAILS_SERVE_STATIC_FILES=enabled \
    LANG=en_US.UTF-8

# Expose port 3000 from the container
EXPOSE 9292

# setup postgresql
# https://github.com/kiasaki/docker-alpine-postgres/blob/master/docker-entrypoint.sh
ENV LANG=en_US.utf8 \
    PGDATA=/var/lib/postgresql/data \
    POSTGRES_DB=pwb \
    POSTGRES_PASSWORD=superman \
    POSTGRES_USER=superman \
    SECRET_KEY_BASE=20dbf7add3eb28096f1e77cb4e15f13a46e6692f4d0c0f9a3e9db7cb4ddaa8a7cac0912cc1f8ac9ae1fae9eb3115e2dbd32b1e626ca72da9c9fc83beb2cb6312
RUN apk add sudo && \
    mkdir -p $PGDATA && \
    mkdir -p /run/postgresql/ && \
    chown -R postgres "$PGDATA" && \
    chown -R postgres /run/postgresql/ && \
    sudo -E -u postgres initdb && \
    sed -ri "s/^#(listen_addresses\s*=\s*)\S+/\1'*'/" "$PGDATA"/postgresql.conf && \
    echo "CREATE DATABASE $POSTGRES_DB" | sudo -E -u postgres postgres --single -jE  && \
    echo "CREATE USER $POSTGRES_USER WITH SUPERUSER PASSWORD '$POSTGRES_PASSWORD'" | sudo -E -u postgres postgres --single -jE && \
    echo "host all all 0.0.0.0/0 md5" >> "$PGDATA"/pg_hba.conf && \
    sed  -e 's/pwb-for-heroku$/superman/g' \
        -e 's/pwb-for-heroku_production/pwb/g' \
        -e 's/PWB-FOR-HEROKU_DATABASE_PASSWORD/POSTGRES_PASSWORD/g' -i config/database.yml

# the main entry point
CMD /app/docker-entrypoint.sh
