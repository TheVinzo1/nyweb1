#! /bin/bash

echo "Pulling latest changes..."
git pull

echo "Building Docker image..."
docker compose build --no-cache

echo "Stopping and removing containers..."
docker compose down

echo "Starting containers..."
docker compose up -d

echo "Deployment complete!"