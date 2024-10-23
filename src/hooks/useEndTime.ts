import { useState } from "react";

const useEndTime = (initialValue = "11:00") => {
  const [endTime, setEndTime] = useState(initialValue);

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  return {
    endTime,
    handleEndTimeChange,
  };
};

export default useEndTime;
