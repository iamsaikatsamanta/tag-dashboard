FROM node:alpine as builder
RUN npm install -g @angular/cli@7.3.8

WORKDIR '/dashboard'

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /dashboard/dist/tag-dashboard /usr/share/nginx/html
