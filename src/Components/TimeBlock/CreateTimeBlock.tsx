import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Textarea,
} from "@chakra-ui/react";

interface CreateTimeBlockProps {
  handleCancel: () => void;
}

const CreateTimeBlock = ({ handleCancel }: CreateTimeBlockProps) => {
  return (
    <Card>
      <CardBody>
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input autoFocus name="title" placeholder="Take a shower" />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Scrub a dub dub in the shower"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Choose duration</FormLabel>
            <HStack spacing="4">
              <NumberInput name="hours" min={0} max={5}>
                <NumberInputField placeholder="Hours" />
              </NumberInput>
              <NumberInput name="minutes" min={0} max={59}>
                <NumberInputField placeholder="Minutes" />
              </NumberInput>
            </HStack>
          </FormControl>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button colorScheme="green" type="submit">
            Create
          </Button>
          <Button colorScheme="blue" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CreateTimeBlock;
