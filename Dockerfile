FROM node:16-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENTRYPOINT ["sh", "./scripts/start.sh"]
