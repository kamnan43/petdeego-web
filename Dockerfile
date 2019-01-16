FROM node:8.12.0-alpine

RUN mkdir /app
WORKDIR /app

ADD components /app/components
ADD pages /app/pages
ADD src /app/src
ADD static /app/static
ADD .babelrc /app/.babelrc
ADD next.config.js /app/next.config.js
ADD package.json /app/package.json
ADD server.js /app/server.js
ADD postcss.config.js /app/postcss.config.js
ADD .env /app/.env

RUN npm install && npm run build

EXPOSE 9000

CMD ["npm", "run", "start:production"]