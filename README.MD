# Reception (admin panel)

## Live preview: [DEMO](https://reception-304016.ew.r.appspot.com/)

## Build with

- **Server**: Express, GraphQL, TypeORM, TypeScript
- **Client**: React, GraphQL, Apollo, TypeScript, Material-UI

## Core features

- Add/Remove
  - Customers
  - Companies
  - Appointments
- Validation
  - live
  - static
- Pagination
- Data visualization
- TypeORM
  - RDBMS (branch: master)
  - MongoDB (branch: mongodb)

## ! **In this branch are some differences compared to master** !

## Install and run

- Install mongodb server
  - do not use **ormconfig.json**. Remove if exist.
- Configure **.env** files for client and server, examples bellow.

**Client**
```powershell
yarn install
yarn start
```

**Server**
```powershell
yarn install
yarn dev
```

## Client - example .env

In client root directory create:

- .env.development .env.production .env.test

```environment
REACT_APP_NAME=Reception
REACT_APP_API_URL=http://localhost:3000/graphql
```

## Server - example .env

In server root directory create:

- .env.development .env.production .env.test

```environment
PORT=3000
GRAPHIQL=true
SEARCH_LIMIT=10
WEB_SERVER=false

# mongodb://localhost:27017/<DB_NAME>
# mongodb+srv://<USER>:<PASSWORD>@<URL>/<DB_NAME>
DB_HOST=<MONGODB URL WITH DB NAME>
DB_SSL=<true if use atlas, false if localhost>
DB_ENTITIES=./src/models/index.ts # development/test
DB_ENTITIES=./dist/src/models/index.js # production
```
