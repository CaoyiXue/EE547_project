import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import resolvers from "../resolvers.js";

const typeDefs = readFileSync("./schema.graphql", "utf-8");
const driver = neo4j.driver(
  "bolt://127.0.0.1:7687",
  neo4j.auth.basic("neo4j", "caoyixue")
);
const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });
const schema = await neoSchema.getSchema();
const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 8088 },
});
console.log(`🚀  Server ready at ${url}`);
