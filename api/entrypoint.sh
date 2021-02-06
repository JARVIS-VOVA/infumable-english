#!/bin/bash
set -e

rm -f tmp/pids/server.pid

rails db:create db:migrate db:seed

exec "$@"
