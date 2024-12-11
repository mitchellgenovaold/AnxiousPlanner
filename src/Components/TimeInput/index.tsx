import { Editable } from "@chakra-ui/react/editable";
import { convertTo12HourFormat } from "../../utils/helpers";
import CustomEditablePreview from "./CustomEditablePreview";

interface TimeInputProps {
  time: string;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput = ({ time, handleTimeChange }: TimeInputProps) => {
  return (
    <Editable.Root value={time}>
      <CustomEditablePreview valueToDisplay={convertTo12HourFormat(time)} />
      <Editable.Input type="time" onChange={handleTimeChange} />
    </Editable.Root>
  );
};

export default TimeInput;
