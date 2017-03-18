FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY bs-config.js /app

RUN npm install -g browser-sync

EXPOSE 3000

VOLUME /app/dist

CMD ["browser-sync", "start", "--config", "bs-config.js"]
