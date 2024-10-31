#!/bin/bash

echo "# Running migrations"
npx prisma db push deploy --accept-data-loss --skip-generate

echo "# Running generateschema"
npx prisma generate
