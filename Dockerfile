FROM node:16-alpine as development
WORKDIR /app
EXPOSE ${PORT:-3333}
RUN apk update && apk add --no-cache bash \
  git \
  npm
COPY package*.json .
RUN npm install
COPY --chown=node:node . .
RUN npx prisma generate
USER node
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





