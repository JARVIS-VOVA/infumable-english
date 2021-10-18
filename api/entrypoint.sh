#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f tmp/pids/server.pid

rails db:create db:migrate db:seed

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
