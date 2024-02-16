import { ApolloServer } from "@apollo/server";
import {
  StandaloneServerContextFunctionArgument,
  startStandaloneServer,
} from "@apollo/server/standalone";
import resolvers from "./resolvers/index.js";
import connectToDB from "./connectors/MongoConnector.js";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { facilityTypeDefs } from "./typeDefs/FacilityTypeDefs.js";
import { commonTypeDefs } from "./typeDefs/CommonsDefs.js";
import { userTypeDefs } from "./typeDefs/UserTypeDefs.js";
import { getUser } from "./utils/getUser.js";

connectToDB();

const mergedTypeDefs = mergeTypeDefs([
  commonTypeDefs,
  facilityTypeDefs,
  userTypeDefs,
]);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: StandaloneServerContextFunctionArgument) => {
    // @ts-ignore
    const isUserLoginResolver = JSON.stringify(req.body).includes("userLogin");
    if (isUserLoginResolver) {
      return {};
    }

    const auth: string | undefined | string[] =
      req.headers?.authorization || "";

    return getUser(auth);
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
