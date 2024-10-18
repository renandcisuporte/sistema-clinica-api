#!/usr/bin/env bash

docker compose down
docker build -t renandci/clinics:development -f ./Dockerfile . --target development
docker compose up -d --build --remove-orphans --force-recreate --build

# docker build -t renandci/clinics:build -f ./Dockerfile .  --target build
# docker build -t renandci/clinics:production -f ./Dockerfile . --target production
