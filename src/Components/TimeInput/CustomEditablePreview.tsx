import {
  Box,
  useColorModeValue,
  useEditableContext,
  useEditableStyles,
} from "@chakra-ui/react";

interface CustomEditablePreviewProps {
  valueToDisplay: string;
}

const CustomEditablePreview = ({
  valueToDisplay,
}: CustomEditablePreviewProps) => {
  const { isEditing, getPreviewProps } = useEditableContext();
  const { preview: previewStyles } = useEditableStyles();
  return (
    !isEditing && (
      // @ts-expect-error Not sure why it is mad that previewStyles are spread here. The type has way more styles than are actually here.
      <Box
        as="span"
        _hover={{
          background: useColorModeValue("gray.100", "gray.600"),
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
