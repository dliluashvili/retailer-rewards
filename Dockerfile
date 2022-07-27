FROM node:16.16.0-alpine

WORKDIR /usr/app/src

COPY package.json ./

RUN npm install

COPY . .