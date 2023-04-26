FROM node:18-alpine

WORKDIR /youtube_downloader

COPY package*.json ./

RUN npm install --only=production

COPY . .

ENV NODE_ENV=production

EXPOSE 4500

CMD [ "node", "App.js" ]