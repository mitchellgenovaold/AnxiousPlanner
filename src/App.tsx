import { Button } from "@chakra-ui/react/button";
import { Card } from "@chakra-ui/react/card";
import { Flex } from "@chakra-ui/react/flex";
import { SimpleGrid } from "@chakra-ui/react/grid";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import FloatingAddButton from "./Components/FloatingAddButton";
import SortableItem from "./Components/SortableItem";
import TimeBlock from "./Components/TimeBlock";
import CreateTimeBlock from "./Components/TimeBlock/CreateTimeBlock";
import TimeInput from "./Components/TimeInput";
import { Provider } from "./Components/ui/provider";
import useDragAndDrop from "./hooks/useDragAndDrop";
import useEndTime from "./hooks/useEndTime/useEndTime";
import useTimeBlocks from "./hooks/useTimeBlocks";
import { calculateStartTimes } from "./utils/helpers";

function App() {
  const { endTime, handleEndTimeChange } = useEndTime();

  const {
    timeBlocks,
    isCreatingTimeBlock,
    handleAddTimeBlock,
    handleCreateTimeBlock,
    handleCancelCreate,
    handleDeleteTimeBlock,
    getIsActiveTimeBlockCreation,
    setTimeBlocks,
    handleEditTimeBlock,
  } = useTimeBlocks();

  const { handleDragStart, handleDragEnd, handleDragCancel } = useDragAndDrop({
    //@ts-expect-error Need to redo the types a bit
    items: timeBlocks,
    setItems: setTimeBlocks,
  });

  const formattedTimeBlocks = useMemo(
    () =>
      calculateStartTimes({
        timeBlocks,
        time: endTime,
      }),
    [timeBlocks, endTime]
  );

  const disableDragAndDrop =
    isCreatingTimeBlock || formattedTimeBlocks.length <= 1;

  return (
    <Provider>
      <Flex
        width="100%"
        height="100%"
        direction="column"
        alignItems="center"
        gap={6}
        paddingTop={4}
        maxWidth="800px"
        marginLeft="auto"
        marginRight="auto"
      >
        <Card.Root width="100%">
          <Card.Body display="flex" alignItems="center">
            <span>Time to be at the place:</span>
            <TimeInput
              time={endTime}
              handleTimeChange={(event) =>
                handleEndTimeChange(event.target.value)
              }
            />
          </Card.Body>
        </Card.Root>
        <SimpleGrid columns={1} gap={2} width="100%">
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={formattedTimeBlocks}
              disabled={disableDragAndDrop}
            >
              {formattedTimeBlocks.map((timeBlock, index) => (
                <SortableItem id={timeBlock.id} key={timeBlock.id}>
                  <Flex gap={4} direction="column" position="relative">
                    <TimeBlock
                      handleDeleteTimeBlock={() => handleDeleteTimeBlock(index)}
                      handleEditTimeBlock={handleEditTimeBlock}
                      {...timeBlock}
                    />
                    {!isCreatingTimeBlock && timeBlocks.length > 1 && (
                      <FloatingAddButton
                        handleAddTimeBlock={() =>
                          handleAddTimeBlock(timeBlock.id)
                        }
                      />
                    )}
                    {getIsActiveTimeBlockCreation(timeBlock.id) && (
                      <form onSubmit={handleCreateTimeBlock}>
                        <CreateTimeBlock handleCancel={handleCancelCreate} />
                      </form>
                    )}
                  </Flex>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </SimpleGrid>
        {getIsActiveTimeBlockCreation("firstTimeBlock") && (
          <form onSubmit={handleCreateTimeBlock}>
            <CreateTimeBlock handleCancel={handleCancelCreate} />
          </form>
        )}
        {!isCreatingTimeBlock && (
          <Button
            colorPalette="green"
            onClick={() =>
              handleAddTimeBlock(
                timeBlocks.length
                  ? timeBlocks[timeBlocks.length - 1].id
                  : "firstTimeBlock"
              )
            }
          >
            Add TimeBlock
          </Button>
        )}
      </Flex>
    </Provider>
  );
}

export default App;
