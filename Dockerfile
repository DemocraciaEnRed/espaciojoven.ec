FROM node:4

MAINTAINER Guido Vilariño <guido@democracyos.org>

RUN npm config set python python2.7

COPY ["package.json", "/usr/src/"]

WORKDIR /usr/src

ENV NODE_ENV=production \
  NODE_PATH=/usr/src

RUN npm install --quiet

COPY [".", "/usr/src/"]

RUN npm run build

EXPOSE 3000

CMD ["node", "."]
