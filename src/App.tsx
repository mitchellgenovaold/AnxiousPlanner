/** @jsxImportSource @emotion/react */
import { Button, ChakraProvider, SimpleGrid } from "@chakra-ui/react";
import theme from "../theme";
import TimeBlock from "./TimeBlock";
import { css } from "@emotion/react";
import { useState } from "react";
import CreateTimeBlock from "./TimeBlock/CreateTimeBlock";
import { TimeBlockInterface } from "./types";

const styles = {
  container: css({
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    gap: "24px",
  }),
  timeblockContainer: css({
    display: "grid",
  }),
};

// Function to calculate start time
function calculateStartTimes(
  timeBlocks: TimeBlockInterface[],
  initialTime: Date
) {
  let currentTime = new Date(initialTime);

  return timeBlocks.map((timeBlock) => {
    // Subtract hours and minutes from the currentTime for the current block
    currentTime = new Date(
      currentTime.getTime() -
        (timeBlock.hours * 60 * 60 * 1000 + timeBlock.minutes * 60 * 1000)
    );

    // Format the time for display purposes
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      ...timeBlock,
      startTime: formattedTime,
    };
  });
}

function App() {
  const today = new Date();
  const initialTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    11,
    0,
    0
  );

  const [timeBlocks, setTimeBlocks] = useState([
    {
      title: "Shower",
      description: "Do the shower",
      hours: 0,
      minutes: 10,
    },
  ]);

  const [showCreateTimeBlock, setShowCreateTimeBlock] = useState(false);

  const handleAddTimeBlock = () => {
    setShowCreateTimeBlock(true);
  };

  const handleCreateTimeBlock: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("title"));
    setTimeBlocks((prevTimeBlocks) => [
      ...prevTimeBlocks,
      {
        title: formData.get("title"),
        description: formData.get("description"),
        hours: formData.get("hours"),
        minutes: formData.get("minutes"),
      },
    ]);
    setShowCreateTimeBlock(false);
  };

  const handleCancelCreate = () => {
    setShowCreateTimeBlock(false);
  };

  const test = calculateStartTimes(timeBlocks, initialTime);
  console.log("test", test);

  return (
    <ChakraProvider theme={theme}>
      <div css={styles.container}>
        <div>Time to be at the place: {initialTime.toLocaleTimeString()}</div>
        <SimpleGrid columns={1} spacing={2}>
          {test.map((timeBlock) => (
            <TimeBlock
              key={timeBlock.title}
              title={timeBlock.title}
              description={timeBlock.description}
              minutes={timeBlock.minutes}
              hours={timeBlock.hours}
              startTime={timeBlock.startTime}
            />
          ))}
          {/* <TimeBlock
            title="Shower"
            description="Taking a shower"
            timeAllocated="10 mins"
            startTime={formattedTime}
          />
          <TimeBlock title="Eat Food" timeAllocated="10 mins" /> */}
        </SimpleGrid>
        {showCreateTimeBlock && (
          <form onSubmit={handleCreateTimeBlock}>
            <CreateTimeBlock handleCancel={handleCancelCreate} />
          </form>
        )}
        <Button onClick={handleAddTimeBlock}>Add TimeBlock</Button>
      </div>
    </ChakraProvider>
  );
}

export default App;
