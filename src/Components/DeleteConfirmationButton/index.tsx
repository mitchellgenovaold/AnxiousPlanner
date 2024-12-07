import { useDisclosure } from "@chakra-ui/hooks/use-disclosure";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react/popover";
import { Button, ButtonGroup } from "@chakra-ui/react/button";

interface DeleteConfirmationButtonProps {
  handleDelete: () => void;
}

const DeleteConfirmationButton = ({
  handleDelete,
}: DeleteConfirmationButtonProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>
        <Button colorScheme="red">Delete</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
        <PopoverBody>
          <ButtonGroup>
            <Button size="sm" colorScheme="red" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button size="sm" colorScheme="blue" onClick={onClose}>
              No, Cancel
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteConfirmationButton;
