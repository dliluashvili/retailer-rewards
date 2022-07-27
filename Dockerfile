FROM node:16.15.0-alpine

WORKDIR /usr/app/src

COPY package.json ./

RUN npm install

COPY . .