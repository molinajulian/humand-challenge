FROM node:10.14.1-alpine

WORKDIR /home/node/app
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
COPY package.json package-lock.json .nvmrc ./

RUN if [ "$NODE_ENV" = "production" ]; then npm install --production; else npm install; fi

COPY . .

EXPOSE 8080
USER node
CMD ["node", "server.js"]
