#!/bin/bash

set -e

cd /home/dclinica/api.dclinicas.com.br/ || true

echo '# Stop project'
pm2 stop ecosystem.config.js

echo "# Installing dependencies"
npm install

echo "# Running migrations"
npx prisma db push deploy --accept-data-loss --skip-generate

echo "# Running generateschema"
npx prisma generate

# echo "# Running seed"
# npx prisma db seed

echo "# Running build"
npm run build

echo "# Running server PM2"
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
