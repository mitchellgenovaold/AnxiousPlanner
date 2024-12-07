import { Editable, EditableInput } from "@chakra-ui/react/editable";
import { convertTo12HourFormat } from "../../utils/helpers";
import CustomEditablePreview from "./CustomEditablePreview";

interface TimeInputProps {
  time: string;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput = ({ time, handleTimeChange }: TimeInputProps) => {
  return (
    <Editable value={time} isPreviewFocusable>
      <CustomEditablePreview valueToDisplay={convertTo12HourFormat(time)} />
      <EditableInput type="time" onChange={handleTimeChange} />
    </Editable>
  );
};

export default TimeInput;
