FROM node:16.11.0-alpine
MAINTAINER hscode.vip
ENV NODE_ENV=production
ENV HOST 0.0.0.0
RUN mkdir -p /nuxt3-hscode
WORKDIR /nuxt3-hscode
COPY . .
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn install
RUN npx nuxi upgrade --force
RUN yarn build
EXPOSE 9169
CMD ["yarn", "start"]