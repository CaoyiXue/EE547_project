import { SimpleGrid, Text } from "@chakra-ui/layout";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

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

const GameGrid = ({ gameQuery }) => {
  const { loading, error, data } = useQuery(SEARCH_GAMES, {
    variables: {
      searchString: gameQuery.searchString,
      genreId: gameQuery.genre?.id,
      parentPlatformId: gameQuery.parentPlatform?.id,
      offset: 0,
      limit: 12,
      order: gameQuery.sortOrder,
    },
  });
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {!!loading
        ? skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))
        : data.search.map((game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          ))}
    </SimpleGrid>
  );
};

export default GameGrid;
