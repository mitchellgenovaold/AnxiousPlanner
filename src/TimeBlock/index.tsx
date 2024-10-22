import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { TimeBlockInterface } from "../types";

interface TimeBlockProps extends TimeBlockInterface {}

const TimeBlock = ({
  title,
  description,
  hours,
  minutes,
  startTime,
  ...props
}: TimeBlockProps) => {
  return (
    <Card>
      <CardHeader>
        <Editable defaultValue={title}>
          <EditablePreview />
          <EditableInput />
        </Editable>
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
      <CardFooter>Start at: {startTime}</CardFooter>
    </Card>
  );
};

export default TimeBlock;
