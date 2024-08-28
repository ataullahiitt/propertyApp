FROM node:20 as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build

#Stage 2
FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4201

ENTRYPOINT ["nginx", "-g", "daemon off;"]