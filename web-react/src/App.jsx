import { Box, Grid, GridItem, Show, useDisclosure, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import ModalForm from "./components/ModalForm";
import GameHeading from "./components/GameHeading";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

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
  const [gameQuery, setGameQuery] = useState({});

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
          <NavBar
            logInOnOpen={logInOnOpen}
            signUpOnOpen={signUpOnOpen}
            signState={signState}
            onSignOut={() => {
              window.location.href = "/";
            }}
            onSearch={(searchString) =>
              setGameQuery({ ...gameQuery, searchString })
            }
          />
        </GridItem>

        {/* Genre Aside. If small screen, do not show it*/}
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
            ></GenreList>
          </GridItem>
        </Show>

        {/* Game Cards*/}
        <GridItem area="main">
          <Box paddingLeft={2}>
            <GameHeading gameQuery={gameQuery} />
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <PlatformSelector
                  selectedParentPlatform={gameQuery.parentPlatform}
                  onSelectParentPlatform={(parentPlatform) =>
                    setGameQuery({ ...gameQuery, parentPlatform })
                  }
                />
              </Box>
              <SortSelector
                sortOrder={gameQuery.sortOrder}
                onSelectSortOrder={(sortOrder) =>
                  setGameQuery({ ...gameQuery, sortOrder })
                }
              />
            </Flex>
          </Box>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>

      {/* Modal Forms of Log In and Sign Up */}
      <ModalForm
        isOpen={signInIsOpen}
        onClose={signInOnClose}
        onSubmit={(data) => {
          console.log(data);
          setSignState(true);
          signInOnClose();
        }}
        formType="log-in"
      ></ModalForm>
      <ModalForm
        isOpen={signUpIsOpen}
        onClose={signUpOnClose}
        onSubmit={(data) => {
          console.log(data);
          setSignState(true);
          signUpOnClose();
        }}
        formType="sign-up"
      ></ModalForm>
    </>
  );
}

export default App;
