FROM node:alpine

ADD . /app
WORKDIR /app
RUN npm install -g browser-sync
EXPOSE 3000

CMD ["browser-sync", "start", "--config", "bs-config.js"]
