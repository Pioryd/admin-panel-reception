import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, Resolver } from "type-graphql";
import { createConnection } from "typeorm";

@Resolver()
export class ExampleResolver {}

const main = async () => {
  dotenv.config();
  dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });

  const connection = await createConnection();
  await connection.synchronize();

  const schema = await buildSchema({
    resolvers: [ExampleResolver]
  });

  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP(() => ({
      schema,
      graphiql: process.env.GRAPHIQL === "true"
    }))
  );

  app.listen(process.env.PORT, () => {
    const port = process.env.PORT;
    const build = process.env.NODE_ENV;

    console.log(`[${build}]Server is running on port: ${port}`);
    if (process.env.GRAPHIQL === "true")
      console.log(`You can run GraphQL API at <address>:${port}/graphql`);
  });
};

main();
