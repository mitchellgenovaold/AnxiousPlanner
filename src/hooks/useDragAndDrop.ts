import { DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { DraggableItem } from "../types";

interface UseDragAndDropProps<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}

const useDragAndDrop = <T extends DraggableItem>({
  items,
  setItems,
}: UseDragAndDropProps<T>) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id);

  const activeIndex = activeId ? getIndex(activeId) : -1;

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (!active) {
      return;
    }

    setActiveId(active.id);
  };

  const handleDragEnd = ({ over }: DragEndEvent) => {
    setActiveId(null);

    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        setItems((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};

export default useDragAndDrop;
