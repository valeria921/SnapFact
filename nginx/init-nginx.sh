#!/bin/sh
set -e

# Check if certificates already exist
if [ -f /etc/letsencrypt/live/idonotlikedocker.com/fullchain.pem ] && [ -f /etc/letsencrypt/live/idonotlikedocker.com/privkey.pem ]; then
  echo "Let's Encrypt certificates found, skipping dummy generation."
  exit 0
fi

# Create dummy self-signed certificates if none found
echo "Generating dummy self-signed certificates..."
mkdir -p /etc/letsencrypt/live/idonotlikedocker.com
openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
    -keyout /etc/letsencrypt/live/idonotlikedocker.com/privkey.pem \
    -out /etc/letsencrypt/live/idonotlikedocker.com/fullchain.pem \
    -subj "/CN=localhost"

echo "Dummy certificates generated."

exit 0 