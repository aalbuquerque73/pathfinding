FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY gulpfile.js /app/gulpfile.js

RUN npm install -g gulp
RUN npm install -g nodemon
RUN npm install

VOLUME [ "/app/src", "/app/dist" ]

CMD ["nodemon", "--watch", "src", "-L", "--exec", "gulp", "build"]
