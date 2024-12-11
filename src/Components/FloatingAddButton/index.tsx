import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  handleAddTimeBlock: () => void;
}

const FloatingAddButton = ({ handleAddTimeBlock }: FloatingAddButtonProps) => {
  return (
    <Plus
      size={32}
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
    />
  );
};

export default FloatingAddButton;
