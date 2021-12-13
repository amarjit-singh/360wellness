FROM ubuntu:20.04
ARG PHP_VERSION
ENV DEBIAN_FRONTEND=noninteractive
COPY setup.sh /setup.sh
RUN apt update \
    && apt install dos2unix \
    && dos2unix /setup.sh \
    && /setup.sh \
    && cd /var/www && cp .env.example .env \
    && php artisan migrate
EXPOSE 80/tcp
ENTRYPOINT service ssh start ; service apache2 start ; tail -f /dev/null