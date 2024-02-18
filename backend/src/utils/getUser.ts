import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { UNAUTHENTICATED } from "../constants/statusMessages.js";

interface AuthSession {
  userId: string;
}

export const getUser = (auth: string): AuthSession => {
  if (!auth) {
    return null;
  }

  const parts: string[] = auth.split(" ");

  if (parts.length !== 2) {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: UNAUTHENTICATED,
        http: { status: 401 },
      },
    });
  }

  const bearer: string = parts[0];
  const token: string = parts[1];

  if (bearer !== "Bearer") {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: UNAUTHENTICATED,
        http: { status: 401 },
      },
    });
  }

  if (!token) {
    throw new GraphQLError("Invalid token", {
      extensions: {
        code: UNAUTHENTICATED,
        http: { status: 401 },
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
