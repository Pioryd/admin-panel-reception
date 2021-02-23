FROM node:12-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


FROM base as production
EXPOSE 8080
WORKDIR /app
COPY --from=base /app ./
RUN npm run build
CMD [ "npm", "run", "start" ]

FROM base as test
WORKDIR /app
COPY --from=base /app ./
CMD [ "npm", "run", "test" ]

FROM node:12-alpine as development
EXPOSE 8080
WORKDIR /app
CMD [ "npm", "run", "dev" ]

