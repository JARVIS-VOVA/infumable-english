FROM node:latest

WORKDIR /usr/apps/infumable-english/frontend

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 4000
CMD ["yarn", "run", "start"]
