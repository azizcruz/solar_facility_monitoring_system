import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const client = new ApolloClient({
  link: from([uploadLink, httpLink]),
  cache: new InMemoryCache(),
});
