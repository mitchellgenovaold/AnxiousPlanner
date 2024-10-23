import { useSortable } from "@dnd-kit/sortable";
import { createContext, PropsWithChildren, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

export const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

interface SortableItemProps {
  id: UniqueIdentifier;
}

const SortableItem = ({
  id,
  children,
}: PropsWithChildren<SortableItemProps>) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
};

export default SortableItem;
