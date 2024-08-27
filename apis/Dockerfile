FROM node:20 AS nodeapi-build

WORKDIR /usr/src/app

COPY ./ /usr/src/app/

#ENV DATABASE_URL=mysql://root:root@localhost:3306/pro_db

RUN  npm install

RUN npx prisma generate

#RUN npx prisma migrate dev

EXPOSE 5000
#CMD ["node", "app.js"]