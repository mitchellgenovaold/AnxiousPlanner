import { Field, Group, NumberInput } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react/button";
import { Card } from "@chakra-ui/react/card";
import { Input } from "@chakra-ui/react/input";
import { HStack, Stack } from "@chakra-ui/react/stack";
import { Textarea } from "@chakra-ui/react/textarea";

interface CreateTimeBlockProps {
  handleCancel: () => void;
}

const CreateTimeBlock = ({ handleCancel }: CreateTimeBlockProps) => {
  return (
    <Card.Root>
      <Card.Body>
        <Stack gap="4">
          <Field.Root required>
            <Field.Label>Title</Field.Label>
            <Input autoFocus name="title" placeholder="Take a shower" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              name="description"
              placeholder="Scrub a dub dub in the shower"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Choose duration</Field.Label>
            <HStack gap="4">
              <NumberInput.Root name="hours" min={0} max={24}>
                <NumberInput.Field placeholder="Hours" />
              </NumberInput.Root>
              <NumberInput.Root name="minutes" min={0} max={59}>
                <NumberInput.Field placeholder="Minutes" />
              </NumberInput.Root>
            </HStack>
          </Field.Root>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Group attached>
          <Button colorPalette="green" type="submit">
            Create
          </Button>
          <Button colorPalette="blue" onClick={handleCancel}>
            Cancel
          </Button>
        </Group>
      </Card.Footer>
    </Card.Root>
  );
};

export default CreateTimeBlock;
