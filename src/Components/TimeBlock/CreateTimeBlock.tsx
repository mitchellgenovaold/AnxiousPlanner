import { Button } from "@chakra-ui/react/button";
import { ButtonGroup } from "@chakra-ui/react/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/react/card";
import { FormControl, FormLabel } from "@chakra-ui/react/form-control";
import { HStack, Stack } from "@chakra-ui/react/stack";
import { Input } from "@chakra-ui/react/input";
import { NumberInput, NumberInputField } from "@chakra-ui/react/number-input";
import { Textarea } from "@chakra-ui/react/textarea";

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
              <NumberInput name="hours" min={0} max={24}>
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
