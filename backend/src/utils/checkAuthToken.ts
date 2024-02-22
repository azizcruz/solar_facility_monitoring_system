import { GraphQLServerContext } from "@apollo/server";
import { GraphQLError } from "graphql";
import { UNAUTHENTICATED } from "../constants/statusMessages.js";
import jwt from "jsonwebtoken";

interface Context extends GraphQLServerContext {
  user_id: string;
}

export function checkAuthToken() {
  return async (req, _res, next) => {
    const authHeader: string = req.headers.authorization || "";
    const token: string = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        throw new GraphQLError("Invalid token", {
          extensions: {
            code: UNAUTHENTICATED,
          },
        });
      }
    } else {
      throw new GraphQLError("Authentication token is missing", {
        extensions: {
          code: UNAUTHENTICATED,
        },
      });
    }
    next();
  };
}
