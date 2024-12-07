import {
  Button,
  Card,
  CardBody,
  ChakraProvider,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMemo } from "react";
import theme from "../theme";
import { calculateStartTimes } from "./utils/helpers";
import FloatingAddButton from "./Components/FloatingAddButton";
import TimeBlock from "./Components/TimeBlock";
import CreateTimeBlock from "./Components/TimeBlock/CreateTimeBlock";
import TimeInput from "./Components/TimeInput";
import useTimeBlocks from "./hooks/useTimeBlocks";
import useEndTime from "./hooks/useEndTime/useEndTime";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./Components/SortableItem";
import useDragAndDrop from "./hooks/useDragAndDrop";

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
    <ChakraProvider theme={theme}>
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
        <Card width="100%">
          <CardBody display="flex" alignItems="center">
            <span>Time to be at the place:</span>
            <TimeInput
              time={endTime}
              handleTimeChange={(event) =>
                handleEndTimeChange(event.target.value)
              }
            />
          </CardBody>
        </Card>
        <SimpleGrid columns={1} spacing={2} width="100%">
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
            colorScheme="green"
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
    </ChakraProvider>
  );
}

export default App;
