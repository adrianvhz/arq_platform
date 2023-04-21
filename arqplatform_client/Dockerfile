FROM node:16.14-alpine3.15 as builder_prod

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

EXPOSE 5000

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder_prod /app/dist /usr/share/nginx/html
