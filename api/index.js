import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import resolvers from "./resolvers.js";
import { readFileSync } from "fs";
import __dirname from "./dirname.js";

const typeDefs = readFileSync(`${__dirname}/schema.graphql`, "utf-8");
const driver = neo4j.driver(
  "neo4j+s://7466064e.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "caoyixue")
);
const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });
const schema = await neoSchema.getSchema();

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  "/graphql",
  cors({
    origin: [
      "http://3.13.47.159:3000",
      "http://localhost:3000",
      "http://web:3000",
      "http://127.0.0.1:5173",
      "http://::1:5173",
      "https://studio.apollographql.com",
    ],
  }),
  bodyParser.json(),
  expressMiddleware(server)
);
const PORT = 3001;

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
