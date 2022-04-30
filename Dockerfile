FROM node:16.11.0-alpine
MAINTAINER hscode.vip
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /hscode
COPY . /hscode
WORKDIR /hscode
# RUN yarn config set registry https://registry.npm.taobao.org
RUN npx nuxi upgrade --force
RUN yarn install
RUN yarn build
EXPOSE 9169
CMD ["yarn", "start"]