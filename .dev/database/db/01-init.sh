#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  GRANT USAGE ON SCHEMA public TO $APP_DB_USER;
  GRANT CREATE ON SCHEMA public TO $APP_DB_USER;
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $APP_DB_USER;
  GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $APP_DB_USER;
  ALTER DATABASE $APP_DB_NAME OWNER TO $APP_DB_USER;
EOSQL
