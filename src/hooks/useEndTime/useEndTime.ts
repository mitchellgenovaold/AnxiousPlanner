import { useState } from "react";

const useEndTime = (initialValue = "11:00") => {
  const [endTime, setEndTime] = useState(initialValue);

  const handleEndTimeChange = (newEndTime: string) => {
    setEndTime(newEndTime);
  };

  return {
    endTime,
    handleEndTimeChange,
  };
};

export default useEndTime;
