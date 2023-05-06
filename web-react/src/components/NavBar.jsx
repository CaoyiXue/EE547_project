import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  Link,
  HStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import reactLogo from "../assets/react.svg";
import portrait from "../assets/portrait.png";

const NavBar = ({
  logInOnOpen,
  signUpOnOpen,
  signState,
  onSignOut,
  onSearch,
}) => {
  const ref = useRef(null);

  return (
    <HStack justifyContent="space-between" padding="10px 70px 10px 25px">
      <Link to="/">
        <Image src={reactLogo} boxSize="60px" />
      </Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) onSearch(ref.current.value || "*");
        }}
      >
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search games..."
            variant="filled"
          />
        </InputGroup>
      </form>
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
