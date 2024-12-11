import { UniqueIdentifier } from "@dnd-kit/core";
import { TimeBlockInterface } from "../../types";

type AddedAction = {
  type: "added";
  activeCreateId: UniqueIdentifier;
  timeBlock: Omit<TimeBlockInterface, "startTime">;
};

type EditedAction = {
  type: "edited";
  timeBlock: Omit<TimeBlockInterface, "startTime">;
};

type DeletedAction = {
  type: "deleted";
  index: number;
};

type SetTimeBlocksAction = {
  type: "set-timeBlocks";
  newTimeBlocks: Omit<TimeBlockInterface, "startTime">[];
};

type Action = AddedAction | EditedAction | DeletedAction | SetTimeBlocksAction;

const timeBlockReducer = (
  timeBlocks: Omit<TimeBlockInterface, "startTime">[],
  action: Action
) => {
  switch (action.type) {
    case "added": {
      const newTimeBlocks = [...timeBlocks];
      const timeBlockToPlaceAfterIndex = timeBlocks.findIndex(
        (timeBlock) => timeBlock.id === action.activeCreateId
      );

      if (timeBlockToPlaceAfterIndex !== -1) {
        newTimeBlocks.splice(
          timeBlockToPlaceAfterIndex + 1,
          0,
          action.timeBlock
        );
      }

      return newTimeBlocks;
    }
    case "edited": {
      const newTimeBlocks = [...timeBlocks];
      const timeBlockToEditIndex = timeBlocks.findIndex(
        (timeBlock) => timeBlock.id === action.timeBlock.id
      );

      if (timeBlockToEditIndex !== -1) {
        newTimeBlocks[timeBlockToEditIndex] = action.timeBlock;
      }

      return newTimeBlocks;
    }
    case "deleted": {
      return timeBlocks.filter((_, index) => index !== action.index);
    }
    case "set-timeBlocks": {
      return action.newTimeBlocks;
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
};

export default timeBlockReducer;
