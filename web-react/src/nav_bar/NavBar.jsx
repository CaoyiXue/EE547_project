import { HStack, Image, Link } from "@chakra-ui/react";
import { useRef } from "react";

import reactLogo from "../assets/react.svg";
import AuthStatus from "./AuthStatus";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const ref = useRef(null);

  return (
    <>
      <HStack justifyContent="space-between" padding="10px 70px 10px 25px">
        <Link to="/">
          <Image src={reactLogo} boxSize="60px" />
        </Link>
        <SearchInput />
        <AuthStatus />
      </HStack>
    </>
  );
};

export default NavBar;
