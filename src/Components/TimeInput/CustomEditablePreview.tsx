import { useColorModeValue } from "@chakra-ui/react/color-mode";
import {
  useEditableStyles,
  useEditableContext,
} from "@chakra-ui/react/editable";
import { Box } from "@chakra-ui/react/box";

interface CustomEditablePreviewProps {
  valueToDisplay: string;
}

const CustomEditablePreview = ({
  valueToDisplay,
}: CustomEditablePreviewProps) => {
  const { isEditing, getPreviewProps } = useEditableContext();
  const { preview: previewStyles } = useEditableStyles();
  const boxBackground = useColorModeValue("gray.100", "gray.600");
  return (
    !isEditing && (
      // @ts-expect-error Not sure why it is mad that previewStyles are spread here. The type has way more styles than are actually here.
      <Box
        as="span"
        _hover={{
          background: boxBackground,
        }}
        {...previewStyles}
        {...getPreviewProps()}
        py={2}
        px={4}
      >
        {valueToDisplay}
      </Box>
    )
  );
};

export default CustomEditablePreview;
