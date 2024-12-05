import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useEndTime from "./useEndTime";

describe("useEndTime", () => {
  it("should return a default value", () => {
    const initialEndTime = "11:00am";
    const { result } = renderHook(() => useEndTime(initialEndTime));

    expect(result.current.endTime).toBe(initialEndTime);
  });

  it("should update the returned value when handleEndTimeChange is called", () => {
    const initialEndTime = "11:00am";
    const newEndTime = "12:00pm";

    const { result } = renderHook(() => useEndTime(initialEndTime));

    act(() => result.current.handleEndTimeChange(newEndTime));

    expect(result.current.endTime).toBe(newEndTime);
  });
});
