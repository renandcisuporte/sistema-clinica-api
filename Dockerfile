FROM node:16-alpine as development
RUN apk update && apk add --no-cache libc6-compat \
  bash \
  git \
  npm
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node . .
RUN npx prisma generate --schema=./prisma/schema.prisma
# RUN npx prisma db push --schema=./prisma/schema.prisma
USER node
EXPOSE ${PORT:-3333}
CMD npm run dev

FROM node:16-alpine as build
WORKDIR /app
COPY --chown=node:node --from=development /app /app
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node --from=build ./app/build ./app/build
COPY --chown=node:node --from=build ./app/public ./app/public
COPY --chown=node:node --from=build ./app/prisma ./app/prisma
CMD npm run start





