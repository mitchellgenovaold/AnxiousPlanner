import { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

const useTimeBlocks = () => {
  const [timeBlocks, setTimeBlocks] = useState([
    {
      id: Date.now(),
      title: "Shower",
      description: "Do the shower",
      hours: 0,
      minutes: 10,
    },
  ]);
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

    setTimeBlocks((prevTimeBlocks) => {
      const newTimeBlocks = [...prevTimeBlocks];
      const timeBlockToPlaceAfterIndex = prevTimeBlocks.findIndex(
        (timeBlock) => timeBlock.id === activeCreateId
      );

      if (timeBlockToPlaceAfterIndex !== -1) {
        newTimeBlocks.splice(timeBlockToPlaceAfterIndex + 1, 0, newTimeBlock);
      }

      return newTimeBlocks;
    });

    setActiveCreateId(null);
  };

  const handleCancelCreate = () => {
    setActiveCreateId(null);
  };

  const handleDeleteTimeBlock = (index: number) => {
    setTimeBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const isCreatingTimeBlock = !!activeCreateId;

  const getIsActiveTimeBlockCreation = (id: UniqueIdentifier) => {
    return activeCreateId === id;
  };

  return {
    timeBlocks,
    handleAddTimeBlock,
    handleCreateTimeBlock,
    handleCancelCreate,
    handleDeleteTimeBlock,
    isCreatingTimeBlock,
    getIsActiveTimeBlockCreation,
    setTimeBlocks,
  };
};

export default useTimeBlocks;
