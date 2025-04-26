FROM certbot/certbot

# Install Namecheap plugin and Docker CLI
RUN apk add --no-cache docker-cli \
    && pip install --no-cache-dir certbot-dns-namecheap 