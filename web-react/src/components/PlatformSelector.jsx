import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";

const PlatformSelector = ({
  onSelectParentPlatform,
  selectedParentPlatform,
}) => {
  const { data, error } = usePlatforms();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedParentPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectParentPlatform({})} key={0}>
          All
        </MenuItem>
        {data.map((parentPlatform) => (
          <MenuItem
            onClick={() => onSelectParentPlatform(parentPlatform)}
            key={parentPlatform.id}
          >
            {parentPlatform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
