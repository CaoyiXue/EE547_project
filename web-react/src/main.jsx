import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme.js";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./services/apolloClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
