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

## Docker

Replace **<prod|test|dev>** with destination build type.

```bash
docker-compose -f docker-compose.yml -f docker-compose.<prod|test|dev>.yml up -d
```

## Install and run

- Install destination database server
  - default config(**ormconfig.json**) is for PostgreSQL
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
```
