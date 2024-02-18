import { ApolloServer } from "@apollo/server";
import resolvers from "./resolvers/index.js";
import connectToDB from "./connectors/MongoConnector.js";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { facilityTypeDefs } from "./typeDefs/FacilityTypeDefs.js";
import { commonTypeDefs } from "./typeDefs/CommonsDefs.js";
import { userTypeDefs } from "./typeDefs/UserTypeDefs.js";
import { getUser } from "./utils/getUser.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import cors from "cors";
import bodyParser from "body-parser";
import { pvMetricTypeDefs } from "./typeDefs/PVMetricType.js";

connectToDB();

const mergedTypeDefs = mergeTypeDefs([
  commonTypeDefs,
  pvMetricTypeDefs,
  facilityTypeDefs,
  userTypeDefs,
]);

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: false,
});

await server.start();

app.use(
  "/",
  cors(),
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

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req }: StandaloneServerContextFunctionArgument) => {
//     // @ts-ignore
//     const isUserLoginResolver = JSON.stringify(req.body).includes("userLogin");
//     if (isUserLoginResolver) {
//       return {};
//     }

//     const auth: string | undefined | string[] =
//       req.headers?.authorization || "";

//     return getUser(auth);
//   },
// }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
