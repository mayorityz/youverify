FROM node:14

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8084

CMD ["node", "app.js"]