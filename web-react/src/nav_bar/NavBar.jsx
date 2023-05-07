import {
  Button,
  HStack,
  Image,
  Link
} from "@chakra-ui/react";
import { useRef } from "react";
import portrait from "../assets/portrait.png";
import reactLogo from "../assets/react.svg";
import SearchInput from "./SearchInput";

const NavBar = ({
  logInOnOpen,
  signUpOnOpen,
  signState,
  onSignOut,
}) => {
  const ref = useRef(null);

  return (
    <HStack justifyContent="space-between" padding="10px 70px 10px 25px">
      
      <Link to="/">
        <Image src={reactLogo} boxSize="60px" />
      </Link>

      <SearchInput />

      <HStack paddingLeft={1}>
        <Button
          colorScheme="twitter"
          onClick={!signState ? logInOnOpen : null}
          variant="link"
          marginRight={4}
        >
          {!signState ? (
            "Log In"
          ) : (
            <Image src={portrait} boxSize="40px" borderRadius={10} />
          )}
        </Button>
        <Button
          colorScheme="facebook"
          onClick={!signState ? signUpOnOpen : onSignOut}
        >
          {!signState ? "Sign Up" : "Sign Out"}
        </Button>
      </HStack>
    </HStack>
  );
};

export default NavBar;
