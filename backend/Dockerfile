FROM node:latest

WORKDIR /usr/apps/infumable-english/backend

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "run", "dev"]
