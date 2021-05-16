FROM node:fermium-alpine3.12

WORKDIR /api

COPY package*.json ./

RUN npm install --prod

COPY . /api

CMD ["npm", "run", "prod"]