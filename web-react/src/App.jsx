import {
  Box,
  Flex,
  Grid,
  GridItem,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ModalForm from "./nav_bar/ModalForm";
import GameGrid from "./game_grid/GameGrid";
import GameHeading from "./game_heading/GameHeading";
import PlatformSelector from "./game_selector/PlatformSelector";
import SortSelector from "./game_selector/SortSelector";
import GenreList from "./genre_list/GenreList";
import NavBar from "./nav_bar/NavBar";

function App() {
  const {
    isOpen: signInIsOpen,
    onOpen: logInOnOpen,
    onClose: signInOnClose,
  } = useDisclosure();

  const {
    isOpen: signUpIsOpen,
    onOpen: signUpOnOpen,
    onClose: signUpOnClose,
  } = useDisclosure();

  const [signState, setSignState] = useState(false);

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        {/* Navigation Bar*/}
        <GridItem area="nav">
          <NavBar />
        </GridItem>

        {/* Genre Aside. If small screen, do not show it*/}
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList />
          </GridItem>
        </Show>

        {/* Game Cards*/}
        <GridItem area="main">
          <Box paddingLeft={2}>
            <GameHeading />
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <PlatformSelector />
              </Box>
              <SortSelector />
            </Flex>
          </Box>
          <GameGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
