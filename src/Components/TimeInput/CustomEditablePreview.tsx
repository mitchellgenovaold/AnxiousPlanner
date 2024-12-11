import {
  useEditableStyles,
  useEditableContext,
} from "@chakra-ui/react/editable";
import { Box } from "@chakra-ui/react/box";
import { useColorModeValue } from "../ui/color-mode";

interface CustomEditablePreviewProps {
  valueToDisplay: string;
}

const CustomEditablePreview = ({
  valueToDisplay,
}: CustomEditablePreviewProps) => {
  const { editing, getPreviewProps } = useEditableContext();
  const { preview: previewStyles } = useEditableStyles();
  const boxBackground = useColorModeValue("gray.100", "gray.600");
  return (
    !editing && (
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
