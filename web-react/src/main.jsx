import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme.js";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: {
          keyArgs: ["searchString", "genreId", "parentPlatformId", "order"],

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing, incoming, { args: { offset = 0 }}) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: "http://localhost:8088/graphql",
  cache,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
