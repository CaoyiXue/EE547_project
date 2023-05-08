# database
    "axios", to get game data from rawg by rawg rest api
    "neo4j-driver": connect to neo4j database by javascript
# back end
    "@neo4j/graphql": neo4j graphql library developed by neo4j team for linking neo4j driver and grapql server. For every query and mutation that is executed against this generated schema, the Neo4j GraphQL Library generates a single Cypher query which is executed against the database. This eliminates the infamous N+1 Problem which can make GraphQL implementations slow and inefficient.

    "@apollo/server": using schema and resolver from neo4j graphql library, to serve grapql query or mutation for users. apollo server 4 is the newest version

    "@neo4j/introspector": "^1.0.3", automatically create graphql schema from existing neo4j database
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2", https://www.apollographql.com/docs/apollo-server/api/express-middleware
    The expressMiddleware function enables you to attach Apollo Server to an Express server. So that we can use cors and body-parse.
    "neo4j-driver": "^5.8.0"

# Front end

    "@apollo/client": Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.
    It will provide ApolloProvider so that all components in react can use this apollo client to connect backend.
    "graphql": "^16.6.0",

    "@chakra-ui/react": Like bootstap. 
    "@emotion/react": "^11.10.8",
    "@emotion/styled": "^11.10.8",
    "framer-motion": "^10.12.7",

    "zod": "^3.21.4": user form data/information validation, like checking email, name,.... and show error well
    "@hookform/resolvers": prepare zod for react
    "react-hook-form": prepare zod for react

    
    "react-infinite-scroll-component": let game page be able to scole infinitely and show all games. include apollo client cache methodology. We should not send all games to client at the same time/ once. We send only first 12 games and then use apollo client fetchMore and normalized cache method to gradually fetch more games and show to user.

    "zustand": We need to mantain several states for searching games, including 
        searchString: String => game name
        genreId: String => genre type
        parentPlatformId: String => platform
        order: String => sort order
        limit: Int = 12
        offset: Int = 0

      zustand is for global state management, so that we can easily debug or implement search logic. like javascript promise method to avoid too much callback functions.

    "react-router-dom": for multiple pages on react

    "react":, react required package
    "react-dom": react required package for converting JSX to document object model DOM



## search    
@cypher(
      statement: """
      CALL apoc.do.when(
        $searchString IS NULL,
        'MATCH (node:Game) RETURN node',
        'CALL db.index.fulltext.queryNodes(index, searchString) YIELD node WITH node RETURN node',
        {searchString: $searchString, index: 'gameNameIndex'}
      ) YIELD value
      WITH DISTINCT value.node AS node
      CALL apoc.do.when(
        $genreId IS NULL,
        'RETURN node',
        'MATCH (node)-[:HAS_GENRE]->(:Genre {id: genreId}) RETURN node',
        {genreId: $genreId, node: node}
      ) YIELD value
      WITH DISTINCT value.node AS node
      CALL apoc.do.when(
        $parentPlatformId IS NULL,
        'RETURN node',
        'MATCH (:ParentPlatform {id: parentPlatformId})<-[:IN_CATEGORY]-(:Platform)-[:CAN_PLAY]->(node) RETURN node',
        {parentPlatformId: $parentPlatformId, node: node}
      ) YIELD value
      WITH DISTINCT value.node AS node
      CALL apoc.do.when(
        $order IS NULL,
        'RETURN node',
        'RETURN node ORDER BY node[order] DESC',
        {order: $order, node: node}
      ) YIELD value
      WITH value.node AS node
      RETURN node
      SKIP $offset LIMIT $limit
      """
    )

## user recommend
 recommend(gameId: String!, first: Int = 6): [User]
    @cypher(
      statement: """
      MATCH (this)-[:WANT_PLAY]->(g:Game {id: $gameID})<-[:WANT_PLAY]-(others:User)

      OPTIONAL MATCH (u)-[r1s:LIKE|CLICK]->(gs:Game)<-[r2s:LIKE|CLICK]-(others)
      WITH r1s, r2s, (r1s.value+r2s.value)*100 AS scores1, others
      UNWIND others as other
      WITH other AS others, sum(scores1) AS scores1

      OPTIONAL MATCH (u)-[rel21s:LIKE|CLICK]->(g1s:Game)-[:DEVELOP|CAN_PLAY|PUBLISH|HAS_GENRE|HAS_TAG]-(overlaps)-[:DEVELOP|CAN_PLAY|PUBLISH|HAS_GENRE|HAS_TAG]-(g2s:Game)<-[rel22s:LIKE|CLICK]-(others)
      WITH rel21s, rel22s, count(overlaps)*(rel21s.value+rel22s.value) AS scores2, others, scores1
      UNWIND others AS other
      WITH other, sum(scores2) AS scores2, scores1
      WITH other AS others, scores2+scores1 AS scores
      RETURN others ORDER BY scores DESC
      """

## game recommend
  similar(first: Int = 6): [Game]
    @cypher(
      statement: """
      MATCH (this)-[:DEVELOP|:CAN_PLAY|:PUBLISH|:HAS_GENRE|:HAS_TAG]-(overlap)-[:DEVELOP|:CAN_PLAY|:PUBLISH|:HAS_GENRE|:HAS_TAG]-(res:Game)
      WITH res, COUNT(*) AS score
      RETURN res ORDER BY score DESC LIMIT $first
      """
    )