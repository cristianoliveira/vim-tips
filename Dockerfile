FROM node:17.7.1

WORKDIR /app

COPY . /app
RUN yarn

EXPOSE 4000
CMD [ "yarn", "start" ]
