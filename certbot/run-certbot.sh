#!/bin/sh
set -e

# --- Initial Certificate Request ---
echo "Attempting initial certificate acquisition..."

# Run certonly, ignore failures initially (maybe certs already exist)
certbot certonly \
    --authenticator dns-namecheap \
    --dns-namecheap-credentials /root/.secrets/namecheap.ini \
    --dns-namecheap-propagation-seconds 90 \
    --email valeria.kruk921@gmail.com \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size 4096 \
    --non-interactive \
    -d idonotlikedocker.com \
    -d www.idonotlikedocker.com || true

echo "Initial certonly command finished."

# --- Renewal Loop ---
echo "Starting renewal loop..."

while true; do
    echo "Attempting certificate renewal..."
    certbot renew --quiet --dns-namecheap-propagation-seconds 90
    echo "Renewal attempt finished. Reloading Nginx..."
    # Use kill -HUP to reload nginx gracefully from outside the container
    # This requires the nginx container to have PID 1 as nginx (true for official image)
    # And requires docker cli inside the certbot container OR access to docker.sock
    # Simpler: Use docker exec via docker.sock if mounted, or rely on docker compose restart policy
    # Let's try triggering the reload via docker exec again, assuming docker client might be available or socket mounted
    # NOTE: If this fails, we might need to mount docker.sock or use a different reload strategy
    docker exec nginx nginx -s reload || echo "Failed to reload nginx (docker exec might not be available or nginx container not found)"

    # Sleep for a day (adjust interval as needed)
    echo "Sleeping for 12 hours before next renewal check..."
    sleep 12h
done 