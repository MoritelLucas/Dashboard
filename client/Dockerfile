FROM node:16.13-alpine AS dashboard-client

WORKDIR /client
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=dashboard-client /client/dist/client /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80