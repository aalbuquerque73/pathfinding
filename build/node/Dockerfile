FROM node:alpine

ADD . /app
WORKDIR /app
RUN npm install -g gulp
RUN npm install -g nodemon
RUN npm install

CMD ["nodemon", "--watch", "src", "-L", "--exec", "gulp", "build"]
