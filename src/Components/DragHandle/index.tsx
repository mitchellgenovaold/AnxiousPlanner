import { Grip } from "lucide-react";
import { useContext } from "react";
import { SortableItemContext } from "../SortableItem";

const DragHandle = () => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  return <Grip {...attributes} {...listeners} ref={ref} />;
};

export default DragHandle;
