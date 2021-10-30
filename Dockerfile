FROM node:14-alpine

ARG SERVICE
ENV SERVICE=${SERVICE}

WORKDIR /app

COPY ./$SERVICE/package.json ./$SERVICE/package.json ./

RUN npm install

COPY ./$SERVICE .

CMD ["node", "./src/index.js"]