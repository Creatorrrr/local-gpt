FROM node:18-alpine
WORKDIR /app/server
COPY . .
RUN yarn install --immutable --immutable-cache --check-cache
RUN yarn build
CMD ["yarn", "start:prod"]
EXPOSE 3000