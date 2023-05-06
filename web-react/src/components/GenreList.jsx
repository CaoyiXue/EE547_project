import React from "react";
import useGenres from "../hooks/useGenres";
import {
  Button,
  Image,
  Spinner,
  HStack,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image_url";

const GenreList = ({ selectedGenre, onSelectGenre }) => {
  const { data, isLoading, error } = useGenres();
  if (error) return null;

  if (isLoading) return <Spinner></Spinner>;

  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        Genres
      </Heading>
      <List>
        <ListItem key={0} paddingY="5px">
          <HStack>
            <Image boxSize="32px" borderRadius={8} objectFit="cover" />
            <Button
              whiteSpace="normal"
              textAlign="left"
              fontWeight={"normal"}
              onClick={() => onSelectGenre({})}
              fontSize="md"
              variant="link"
            >
              All
            </Button>
          </HStack>
        </ListItem>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => onSelectGenre(genre)}
                fontSize="md"
                variant="link"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
