import { UniqueIdentifier } from "@dnd-kit/core";

export interface DraggableItem {
  id: UniqueIdentifier;
}

export interface TimeBlockInterface extends DraggableItem {
  title: string;
  description?: string;
  hours: number;
  minutes: number;
  startTime: string;
}
