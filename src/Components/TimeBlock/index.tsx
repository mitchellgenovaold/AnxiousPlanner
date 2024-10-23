import {
  Box,
  Card,
  CardBody,
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
          <Heading size="md" noOfLines={1}>
            <Editable defaultValue={title}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Heading>
          <Text>Start at: {startTime}</Text>
        </Flex>
        <DeleteConfirmationButton handleDelete={handleDeleteTimeBlock} />
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
    </Card>
  );
};

export default TimeBlock;
