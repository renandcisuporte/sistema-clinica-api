#!/usr/bin/env bash

docker build -t renandci/clinics:development -f ./Dockerfile . --target development
# docker build -t renandci/clinics:build -f ./Dockerfile .  --target build
# docker build -t renandci/clinics:production -f ./Dockerfile . --target production
