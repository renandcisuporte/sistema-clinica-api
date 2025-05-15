#!/bin/bash

set -e
npm install
npx prisma migrate deploy || true
npx prisma generate
npm run build
npm run start
