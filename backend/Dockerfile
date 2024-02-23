FROM node:16-alpine



WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install typescript -g
RUN tsc

EXPOSE 4000

CMD [ "npm", "start" ]
