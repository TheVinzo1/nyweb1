#! /bin/bash

echo "Pulling latest changes..."
git pull

echo "Building Docker image..."
docker compose build --no-cache

echo "Stopping and removing containers..."
docker compose down

echo "Starting containers..."
PORT=52430 docker compose up -d

echo "Deployment complete!"