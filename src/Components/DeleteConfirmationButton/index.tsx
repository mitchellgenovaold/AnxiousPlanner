import {
  Button,
  Group,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";

interface DeleteConfirmationButtonProps {
  handleDelete: () => void;
}

const DeleteConfirmationButton = ({
  handleDelete,
}: DeleteConfirmationButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <PopoverRoot
      open={open}
      onOpenChange={(event) => setOpen(event.open)}
      lazyMount
    >
      <PopoverTrigger asChild>
        <Button colorPalette="red">Delete</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
        <PopoverBody>
          <Group>
            <Button size="sm" colorPalette="red" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button
              size="sm"
              colorPalette="blue"
              onClick={() => setOpen(false)}
            >
              No, Cancel
            </Button>
          </Group>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default DeleteConfirmationButton;
