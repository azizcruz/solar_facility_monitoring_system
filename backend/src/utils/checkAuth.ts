import { GraphQLServerContext } from "@apollo/server";
import { GraphQLError } from "graphql";
import { UNAUTHENTICATED } from "../constants/statusMessages.js";

interface Context extends GraphQLServerContext {
  user_id: string;
}

export function checkAuth(context: Context, fieldName: string) {
  if (!context.user_id && fieldName !== "userLogin")
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: UNAUTHENTICATED,
        http: { status: 401 },
      },
    });
}
