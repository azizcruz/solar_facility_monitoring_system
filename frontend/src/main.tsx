import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./plugins/apolloClient.ts";
import { RouterProvider } from "react-router-dom";
import { routes } from "./plugins/routes.tsx";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/auth.tsx";
import { CustomDialog, DialogProvider } from "./context/dialog.tsx";

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AuthProvider>
          <DialogProvider>
            <CustomDialog />
            <RouterProvider router={routes} />
          </DialogProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
