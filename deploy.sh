#!/bin/bash

cd /home/dclinica/public_html/

echo '# Stop project'
pm2 stop ecosystem.config.js

echo "# Installing dependencies"
npm install

echo "# Running migrations"
npx prisma db push

echo "# Running generateschema"
npx prisma generate

echo "# Running seed"
npx prisma db seed

echo "# Running build"
npm run build

echo "# Running server PM2"
pm2 start ecosystem.config.js --env development
pm2 save
pm2 startup