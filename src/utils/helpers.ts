import { TimeBlockInterface } from "../types";

interface CalculateStartTimesParams {
  timeBlocks: Omit<TimeBlockInterface, "startTime">[];
  time: string;
}

export const calculateStartTimes = ({
  timeBlocks,
  time,
}: CalculateStartTimesParams) => {
  const today = new Date();
  const [hours, minutes] = time.split(":");
  today.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  let currentTime = new Date(today);

  return timeBlocks.map((timeBlock) => {
    // Subtract hours and minutes from the currentTime for the current block
    currentTime = new Date(
      currentTime.getTime() -
        (timeBlock.hours * 60 * 60 * 1000 + timeBlock.minutes * 60 * 1000)
    );

    // Format the time for display purposes
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      ...timeBlock,
      startTime: formattedTime,
    };
  });
};

export const convertTo12HourFormat = (timeIn24HourFormat: string) => {
  const [hours, minutes] = timeIn24HourFormat.split(":"); // Split the time into hours and minutes
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 || 12; // Convert to 12-hour format, handling 0 as 12
  return `${twelveHour}:${minutes} ${ampm}`;
};
