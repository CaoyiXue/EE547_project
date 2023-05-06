import { Card, CardBody, HStack, Heading, Text, Image } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image_url.js";
import Emoji from "./Emoji";
const GameCard = ({ game }) => {
  return (
    <Card>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList platforms={game.parent_platforms} />
          <CriticScore score={game.metacritic !== 0 ? game.metacritic : null} />
        </HStack>

        <Heading fontSize="2xl">
          {game.name}
          <Emoji rating={game.rating_top} />
          {/* <Link to={"/games/" + game.slug}>{game.name}</Link> */}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
