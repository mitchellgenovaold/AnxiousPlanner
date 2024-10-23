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
import { calculateStartTimes } from "./utils/helper";
import FloatingAddButton from "./Components/FloatingAddButton";
import TimeBlock from "./Components/TimeBlock";
import CreateTimeBlock from "./Components/TimeBlock/CreateTimeBlock";
import TimeInput from "./Components/TimeInput";
import useTimeBlocks from "./hooks/useTimeBlocks";
import useEndTime from "./hooks/useEndTime";

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
  } = useTimeBlocks();

  const formattedTimeBlocks = useMemo(
    () =>
      calculateStartTimes({
        timeBlocks,
        time: endTime,
      }),
    [timeBlocks, endTime]
  );

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
            <TimeInput time={endTime} handleTimeChange={handleEndTimeChange} />
          </CardBody>
        </Card>
        <SimpleGrid columns={1} spacing={2} width="100%">
          {formattedTimeBlocks.map((timeBlock, index) => (
            <Flex
              key={timeBlock.id}
              gap={4}
              direction="column"
              position="relative"
            >
              <TimeBlock
                handleDeleteTimeBlock={() => handleDeleteTimeBlock(index)}
                {...timeBlock}
              />
              {!isCreatingTimeBlock && timeBlocks.length > 1 && (
                <FloatingAddButton
                  handleAddTimeBlock={() => handleAddTimeBlock(timeBlock.id)}
                />
              )}
              {getIsActiveTimeBlockCreation(timeBlock.id) && (
                <form onSubmit={handleCreateTimeBlock}>
                  <CreateTimeBlock handleCancel={handleCancelCreate} />
                </form>
              )}
            </Flex>
          ))}
        </SimpleGrid>
        {!isCreatingTimeBlock && (
          <Button
            colorScheme="green"
            onClick={() =>
              handleAddTimeBlock(timeBlocks[timeBlocks.length - 1].id)
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
