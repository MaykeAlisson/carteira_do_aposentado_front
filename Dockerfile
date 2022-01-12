# build environment
FROM node:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build
# production environment
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html