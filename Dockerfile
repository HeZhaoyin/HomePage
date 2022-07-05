# build stage
FROM node:lts-alpine as build-stage
WORKDIR /volume2/web/homepage
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /volume2/web/homepage/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]