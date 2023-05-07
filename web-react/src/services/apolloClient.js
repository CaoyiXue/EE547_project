import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: {
          keyArgs: ["searchString", "genreId", "parentPlatformId", "order"],

          merge(existing, incoming, { args: { offset = 0 } }) {
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
const apolloClient = new ApolloClient({
  uri: "http://localhost:8088/graphql",
  cache,
});
export default apolloClient;
