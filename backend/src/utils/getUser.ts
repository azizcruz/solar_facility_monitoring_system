import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { INVALID_TOKEN } from "../constants/statusMessages.js";

interface AuthSession {
  userId: string;
}

export const getUser = (auth: string): AuthSession => {
  const parts: string[] = auth.split(" ");

  if (parts.length !== 2) {
    throw new GraphQLError(INVALID_TOKEN, {
      extensions: {
        code: INVALID_TOKEN,
      },
    });
  }

  const bearer: string = parts[0];
  const token: string = parts[1];

  if (bearer !== "Bearer") {
    throw new GraphQLError(INVALID_TOKEN, {
      extensions: {
        code: INVALID_TOKEN,
      },
    });
  }

  if (!token) {
    throw new GraphQLError(INVALID_TOKEN, {
      extensions: {
        code: INVALID_TOKEN,
      },
    });
  }

  interface DecodedValue {
    userId: string;
    exp: number;
    iat: number;
  }

  const decoded: DecodedValue = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );

  // check if expired or invalid and return false
  if (decoded.exp < Date.now() / 1000 || !decoded) {
    return null;
  }

  return { userId: decoded.userId };
};
