FROM node:16.14-alpine3.15

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "prod"]
