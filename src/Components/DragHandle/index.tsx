import { useContext } from "react";
import { SortableItemContext } from "../SortableItem";
import { IconButton } from "@chakra-ui/react/button";
import { DragHandleIcon } from "@chakra-ui/icons/DragHandle";

const DragHandle = () => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  return (
    <IconButton
      icon={<DragHandleIcon />}
      {...attributes}
      {...listeners}
      ref={ref}
      aria-label="Drag Handle"
      background="transparent"
      width="min-content"
      padding={2}
    />
  );
};

export default DragHandle;
