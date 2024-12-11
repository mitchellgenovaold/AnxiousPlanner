import { UniqueIdentifier } from "@dnd-kit/core";
import { useReducer, useState } from "react";
import timeBlockReducer from "../utils/timeBlockReducer/timeBlockReducer";
import { TimeBlockInterface } from "../types";

const initialTimeBlocks: Omit<TimeBlockInterface, "startTime">[] = [
  {
    id: Date.now(),
    title: "Shower",
    description: "Do the shower",
    hours: 0,
    minutes: 10,
  },
];

const useTimeBlocks = () => {
  const [timeBlocks, dispatch] = useReducer(
    timeBlockReducer,
    initialTimeBlocks
  );

  const [activeCreateId, setActiveCreateId] = useState<UniqueIdentifier | null>(
    null
  );

  const handleAddTimeBlock = (createId: UniqueIdentifier) => {
    setActiveCreateId(createId);
  };

  const handleCreateTimeBlock: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTimeBlock = {
      id: Date.now(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      hours: formData.get("hours") as unknown as number,
      minutes: formData.get("minutes") as unknown as number,
    };

    dispatch({
      type: "added",
      timeBlock: newTimeBlock,
      activeCreateId: activeCreateId!,
    });

    setActiveCreateId(null);
  };

  const handleCancelCreate = () => {
    setActiveCreateId(null);
  };

  const handleDeleteTimeBlock = (index: number) => {
    dispatch({
      type: "deleted",
      index,
    });
  };

  const handleEditTimeBlock = (timeBlock: TimeBlockInterface) => {
    dispatch({
      type: "edited",
      timeBlock,
    });
  };

  const isCreatingTimeBlock = !!activeCreateId;

  const getIsActiveTimeBlockCreation = (id: UniqueIdentifier) => {
    return activeCreateId === id;
  };

  const setTimeBlocks = (newTimeBlocks: TimeBlockInterface[]) => {
    dispatch({
      type: "set-timeBlocks",
      newTimeBlocks,
    });
  };

  return {
    timeBlocks,
    handleAddTimeBlock,
    handleCreateTimeBlock,
    handleEditTimeBlock,
    handleCancelCreate,
    handleDeleteTimeBlock,
    isCreatingTimeBlock,
    getIsActiveTimeBlockCreation,
    setTimeBlocks,
  };
};

export default useTimeBlocks;
