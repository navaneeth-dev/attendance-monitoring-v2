#!/bin/bash
set -eo pipefail
shopt -s nullglob

php artisan optimize
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --isolated --force

exec "$@"
