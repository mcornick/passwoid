FROM node:latest
RUN mkdir /tmp/code
ADD . /tmp/code
WORKDIR /tmp/code
RUN npm install
