import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

interface FloatingAddButtonProps {
  handleAddTimeBlock: () => void;
}

const FloatingAddButton = ({ handleAddTimeBlock }: FloatingAddButtonProps) => {
  return (
    <IconButton
      icon={<AddIcon />}
      size="sm"
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      top="100%"
      mt={-2}
      opacity={0}
      transition="opacity 0.2s"
      zIndex={200}
      _hover={{ opacity: 1 }}
      aria-label="Add TimeBlock"
      onClick={handleAddTimeBlock}
      colorScheme="green"
    />
  );
};

export default FloatingAddButton;
