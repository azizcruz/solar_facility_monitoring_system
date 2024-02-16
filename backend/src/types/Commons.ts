import { BaseContext, GraphQLRequestContext } from "@apollo/server";
import { UserType } from "./User";

export interface ResponseMessage {
  message: string;
}

export interface Token {
  token: string;
}

export interface AuthPluginContext {
  user?: UserType;
}
