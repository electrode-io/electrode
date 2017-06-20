FROM node:4.5
RUN npm i -g npm@3
EXPOSE 3000
ENV DIR /usr/src/app
RUN mkdir -p $DIR
WORKDIR $DIR
COPY . $DIR
RUN npm install
RUN $DIR/node_modules/.bin/clap build
CMD node src/server
