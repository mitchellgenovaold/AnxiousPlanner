import { Box } from "@chakra-ui/react/box";
import { Card } from "@chakra-ui/react/card";
import {
  EditableInput,
  EditablePreview,
  EditableRoot,
} from "@chakra-ui/react/editable";
import { Flex } from "@chakra-ui/react/flex";
import { Stack } from "@chakra-ui/react/stack";
import { Heading, Text } from "@chakra-ui/react/typography";

import { Separator } from "@chakra-ui/react";
import { TimeBlockInterface } from "../../types";
import DeleteConfirmationButton from "../DeleteConfirmationButton";
import DragHandle from "../DragHandle";

interface TimeBlockProps extends TimeBlockInterface {
  handleDeleteTimeBlock: () => void;
  handleEditTimeBlock: (timeBlock: TimeBlockInterface) => void;
}

const TimeBlock = ({
  id,
  title,
  description,
  hours,
  minutes,
  startTime,
  handleEditTimeBlock,
  handleDeleteTimeBlock,
}: TimeBlockProps) => {
  const onEditTimeBlock = (newTitle: string) => {
    handleEditTimeBlock({
      title: newTitle,
      description,
      hours,
      minutes,
      startTime,
      id,
    });
  };

  return (
    <Card.Root>
      <Card.Header display="flex" justifyContent="space-between">
        <Flex direction="column" gap={2}>
          <Flex align="center">
            <Heading size="md" lineClamp={1}>
              <EditableRoot
                defaultValue={title}
                onFocusOutside={(event) => console.log(event)}
              >
                <EditablePreview />
                <EditableInput />
              </EditableRoot>
            </Heading>
          </Flex>
          <Text>Start at: {startTime}</Text>
        </Flex>
        <DragHandle />
      </Card.Header>
      <Card.Body>
        <Stack separator={<Separator />} gap="4">
          {description && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Description
              </Heading>
              <Text pt="2" fontSize="sm">
                {description}
              </Text>
            </Box>
          )}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Time Allocated
            </Heading>
            <Text pt="2" fontSize="sm">
              {!!hours && <>{`${hours} hours `}</>}
              {!!minutes && <>{`${minutes} minutes`}</>}
            </Text>
          </Box>
        </Stack>
      </Card.Body>
      <Card.Footer display="flex" justifyContent="flex-end">
        <DeleteConfirmationButton handleDelete={handleDeleteTimeBlock} />
      </Card.Footer>
    </Card.Root>
  );
};

export default TimeBlock;
