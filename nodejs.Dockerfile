FROM node:16
COPY ./frontend /root/app
RUN cd /root/app \
    && npm run build \
    && apt update && apt install -y apache2 \
    && rm -Rf /var/www/html && cp -r /root/app/build /var/www/html && chown -R www-data:www-data /var/www/html \
    && service apache2 restart
EXPOSE 80/tcp
ENTRYPOINT service apache2 start; tail -f /dev/null
