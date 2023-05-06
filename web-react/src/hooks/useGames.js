import { useQuery, gql } from "@apollo/client";

const SEARCH_GAMES = gql`
  query Query(
    $searchString: String
    $genreId: ID
    $parentPlatformId: ID
    $offset: Int
    $limit: Int
    $order: String
  ) {
    search(
      searchString: $searchString
      genreId: $genreId
      parentPlatformId: $parentPlatformId
      offset: $offset
      limit: $limit
      order: $order
    ) {
      id
      metacritic
      name
      parent_platforms {
        id
        slug
        name
      }
      rating
      rating_top
      slug
      background_image
    }
  }
`;

const useGames = (gameQuery) => {
  return useQuery(SEARCH_GAMES, {
    variables: {
      searchString: gameQuery.searchString,
      genreId: gameQuery.genre?.id,
      parentPlatformId: gameQuery.parentPlatform?.id,
      offset: 0,
      limit: 12,
      order: gameQuery.sortOrder,
    },
  });
};

export default useGames;
