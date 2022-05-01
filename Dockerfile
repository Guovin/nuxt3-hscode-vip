FROM node:16.11.0-alpine
MAINTAINER hscode.vip
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /hscode
COPY . /hscode
WORKDIR /hscode
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install && npm cache clean --force
RUN npm run build
EXPOSE 9169
ENTRYPOINT ["node", ".output/server/index.mjs"]