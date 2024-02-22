import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
  headers: {
    "apollo-require-preflight": "true",
  },
});

const setAuthorizationLink = setContext((request) => ({
  ...request,
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
}));

export const client = new ApolloClient({
  link: ApolloLink.from([setAuthorizationLink, uploadLink, httpLink]),
  cache: new InMemoryCache(),
});
