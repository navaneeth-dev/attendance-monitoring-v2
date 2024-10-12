FROM dunglas/frankenphp

ENV SERVER_NAME=:80

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY . /app

ENTRYPOINT ["php", "artisan", "octane:frankenphp"]
