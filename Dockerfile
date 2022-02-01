FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn install

COPY . .

ENTRYPOINT ["sh", "./scripts/start.sh"]
