FROM dunglas/frankenphp AS base
COPY . /app
WORKDIR /app

RUN apt-get update; \
    apt-get upgrade -yqq; \
    apt-get install -yqq --no-install-recommends --show-progress \
    git \
    unzip \
    libpq-dev

RUN docker-php-ext-install pcntl pdo_pgsql

FROM base AS vendor

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN composer install --no-dev

FROM node:20-slim AS public

RUN corepack enable

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY tsconfig.json /app/tsconfig.json

COPY --from=vendor /app/vendor /app/vendor

WORKDIR /app
RUN pnpm install --frozen-lockfile

# copy src to build
COPY . /app

RUN pnpm run build

# Prod server, copy vendor & public and run octane server
FROM base

LABEL org.opencontainers.image.source="https://github.com/navaneeth-dev/attendance-monitoring-v2"

ENV OCTANE_SERVER=frankenphp

WORKDIR /app
COPY . /app

COPY --from=vendor /app/vendor /app/vendor
COPY --from=public /app/public /app/public

EXPOSE 8000
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD [ "php", "artisan", "octane:start" ]
