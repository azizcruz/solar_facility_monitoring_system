import { ApolloServer } from "@apollo/server";
import { getUser } from "./utils/getUser.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import cors from "cors";
import bodyParser from "body-parser";

import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";
import connectToDB from "./connectors/MongoConnector.js";

connectToDB();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: false,
});

await server.start();

app.use(
  "/",
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  }),
  bodyParser.json(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // @ts-ignore
      const isUserLoginResolver = JSON.stringify(req.body).includes(
        "userLogin"
      );
      if (isUserLoginResolver) {
        return {};
      }
      const auth = req.headers?.authorization || "";
      return getUser(auth);
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
