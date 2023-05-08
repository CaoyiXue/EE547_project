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

const typeDefs = readFileSync("./schema.graphql", "utf-8");
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

app.use("/graphql", cors(["*"]), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 3001 }, resolve));

console.log(`🚀 Server ready at http://localhost:3001/graphql`);
