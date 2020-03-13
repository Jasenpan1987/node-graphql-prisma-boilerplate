import "@babel/polyfill";
import { GraphQLServer, PubSub } from "graphql-yoga";
import path from "path";
import { resolvers, fragmentReplacements } from "./resolvers";
import prisma from "./prisma";

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schema.graphql"),
  resolvers,
  context: req => {
    return {
      pubSub,
      prisma,
      req
    };
  },
  fragmentReplacements
});

export default server;
