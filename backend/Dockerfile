FROM node:16

EXPOSE 3000
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --only=production
COPY . .

HEALTHCHECK CMD curl --fail-early --silent http://localhost:3000/health 2>&1 | grep '"status"' || exit 1
ENTRYPOINT [ "node", "server.js" ]
