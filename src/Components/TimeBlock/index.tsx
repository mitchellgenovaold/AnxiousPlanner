import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { TimeBlockInterface } from "../../types";
import DeleteConfirmationButton from "../DeleteConfirmationButton";
import DragHandle from "../DragHandle";

interface TimeBlockProps extends TimeBlockInterface {
  handleDeleteTimeBlock: () => void;
}

const TimeBlock = ({
  title,
  description,
  hours,
  minutes,
  startTime,
  handleDeleteTimeBlock,
}: TimeBlockProps) => {
  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Flex direction="column" gap={2}>
          <Flex align="center">
            <Heading size="md" noOfLines={1}>
              <Editable defaultValue={title}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Heading>
          </Flex>
          <Text>Start at: {startTime}</Text>
        </Flex>
        <DragHandle />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
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
      </CardBody>
      <CardFooter display="flex" justifyContent="flex-end">
        <DeleteConfirmationButton handleDelete={handleDeleteTimeBlock} />
      </CardFooter>
    </Card>
  );
};

export default TimeBlock;
