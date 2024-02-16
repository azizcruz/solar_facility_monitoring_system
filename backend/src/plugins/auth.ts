import { ApolloServerPlugin } from "@apollo/server";
import jwt from "jsonwebtoken";

export const auth = {
  async requestDidStart() {
    return {
      async didResolveOperation(requestContext) {
        // Get the Authorization header from the request headers
        const authHeader =
          requestContext.request.http.headers?.authuzation || "";

        // Check if the Authorization header is present
        if (!authHeader) {
          throw new Error("Missing authorization header");
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];

        // Verify the token
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          // Attach the decoded token to the context for use in resolvers
          requestContext.context.user = decoded;
        } catch (error) {
          // Handle the error according to your needs
          throw new Error("Invalid token");
        }
      },
    };
  },
};
