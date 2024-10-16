FROM node:20-slim AS public

RUN corepack enable

VOLUME [ "/pnpm-store", "/app/node_modules" ]
RUN pnpm config --global set store-dir /pnpm-store

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

WORKDIR /app
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM dunglas/frankenphp
COPY . /app
WORKDIR /app

RUN apt-get update; \
    apt-get upgrade -yqq; \
    apt-get install -yqq --no-install-recommends --show-progress \
    git \
    unzip

RUN docker-php-ext-install pcntl

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN composer install --no-dev

ENV OCTANE_SERVER=frankenphp

COPY --from=public /app/public /app/public

EXPOSE 8000
CMD [ "php", "artisan", "octane:start" ]
