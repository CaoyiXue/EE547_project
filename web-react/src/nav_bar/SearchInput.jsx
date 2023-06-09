import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGameQueryStore from "../stores/gameStore";

const SearchInput = () => {
  const ref = useRef(null);
  const setSearchString = useGameQueryStore((s) => s.setSearchString);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) setSearchString(ref.current.value);
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
  );
};

export default SearchInput;
