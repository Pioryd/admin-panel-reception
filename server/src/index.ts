import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import {
  CustomerResolver,
  CompanyResolver,
  AppointmentResolver
} from "./resolvers";

const main = async () => {
  dotenv.config();
  dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });

  const connection = await createConnection();
  await connection.synchronize();

  const schema = await buildSchema({
    resolvers: [CustomerResolver, CompanyResolver, AppointmentResolver]
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(
    "/graphql",
    graphqlHTTP(() => ({
      schema,
      graphiql: process.env.GRAPHIQL === "true"
    }))
  );

  if (process.env.WEB_SERVER === "true") {
    app.use(express.static(path.join(__dirname, "../..", "build")));
    app.get("/*", (req, res) =>
      res.sendFile(path.join(__dirname, "../..", "build", "index.html"))
    );
  }

  app.use((req, res, next) => res.status(404).send("API not found"));

  app.listen(process.env.PORT, () => {
    const port = process.env.PORT;
    const build = process.env.NODE_ENV;

    console.log(`[${build}]Server is running on port: ${port}`);
    if (process.env.GRAPHIQL === "true")
      console.log(`You can run GraphQL API at <address>:${port}/graphql`);
  });
};

main();
