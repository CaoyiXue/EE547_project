import { SimpleGrid, Text, Spinner, Button, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import useGames from "../hooks/useGames";

const GameGrid = ({ gameQuery }) => {
  const { loading, error, data, fetchMore } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error) return <Text>{error.message}</Text>;
  const fetchedGamesCount = data?.search?.length || 0;

  return (
    <Box padding="10px">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        {!!loading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data?.search.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
      <Button
        onClick={(event) =>
          fetchMore({
            variables: {
              offset: fetchedGamesCount,
            },
          })
        }
      >
        {"Load More"}
      </Button>
    </Box>
  );
};

export default GameGrid;
