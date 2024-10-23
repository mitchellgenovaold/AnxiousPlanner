import {
  Button,
  Card,
  CardBody,
  ChakraProvider,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import theme from "../theme";
import { calculateStartTimes } from "./utils/helper";
import FloatingAddButton from "./Components/FloatingAddButton";
import TimeBlock from "./Components/TimeBlock";
import CreateTimeBlock from "./Components/TimeBlock/CreateTimeBlock";
import TimeInput from "./Components/TimeInput";

function App() {
  const [endTime, setEndTime] = useState("11:00");
  const [activeCreateId, setActiveCreateId] = useState<number | null>(null);

  const [timeBlocks, setTimeBlocks] = useState([
    {
      id: Date.now(),
      title: "Shower",
      description: "Do the shower",
      hours: 0,
      minutes: 10,
    },
  ]);

  const handleAddTimeBlock = (createId: number) => {
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

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const handleDeleteTimeBlock = (index: number) => {
    setTimeBlocks((prev) => prev.filter((_, i) => i !== index));
  };

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
              {!activeCreateId && timeBlocks.length > 1 && (
                <FloatingAddButton
                  handleAddTimeBlock={() => handleAddTimeBlock(timeBlock.id)}
                />
              )}
              {activeCreateId === timeBlock.id && (
                <form onSubmit={handleCreateTimeBlock}>
                  <CreateTimeBlock handleCancel={handleCancelCreate} />
                </form>
              )}
            </Flex>
          ))}
        </SimpleGrid>
        {!activeCreateId && (
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
