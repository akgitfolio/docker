FROM node:14-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY consumer.js ./

CMD ["node", "consumer.js"]