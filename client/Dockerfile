FROM node:12-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base as build
WORKDIR /app
COPY --from=base /app ./
RUN npm run build

FROM nginx:alpine as production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM base as test
WORKDIR /app
COPY --from=base /app ./
CMD [ "npm", "run", "test" ]

FROM node:12-alpine AS development
WORKDIR /app
EXPOSE 8080
CMD ["npm",  "run", "start" ]

