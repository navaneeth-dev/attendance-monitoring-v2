FROM dunglas/frankenphp AS base
COPY . /app
WORKDIR /app

RUN apt-get update; \
    apt-get upgrade -yqq; \
    apt-get install -yqq --no-install-recommends --show-progress \
    wget \
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

RUN arch="$(uname -m)" \
    && case "$arch" in \
    armhf) _cronic_fname='supercronic-linux-arm' ;; \
    aarch64) _cronic_fname='supercronic-linux-arm64' ;; \
    x86_64) _cronic_fname='supercronic-linux-amd64' ;; \
    x86) _cronic_fname='supercronic-linux-386' ;; \
    *) echo >&2 "error: unsupported architecture: $arch"; exit 1 ;; \
    esac \
    && wget -q "https://github.com/aptible/supercronic/releases/download/v0.2.33/${_cronic_fname}" \
    -O /usr/bin/supercronic \
    && chmod +x /usr/bin/supercronic \
    && mkdir -p /etc/supercronic \
    && echo "*/1 * * * * php /app/artisan schedule:run --no-interaction" > /etc/supercronic/laravel

WORKDIR /app
COPY . /app

COPY --from=vendor /app/vendor /app/vendor
COPY --from=public /app/public /app/public

EXPOSE 8000
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD [ "php", "artisan", "octane:start" ]
