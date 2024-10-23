import { useContext } from "react";
import { SortableItemContext } from "../SortableItem";
import { DragHandleIcon, IconButton } from "@chakra-ui/icons";

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
