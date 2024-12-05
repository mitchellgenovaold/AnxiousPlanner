import { act, renderHook } from "@testing-library/react";
import { useReducer } from "react";
import { describe, expect, it } from "vitest";
import { TimeBlockInterface } from "../../types";
import timeBlockReducer from "./timeBlockReducer";

const initialTimeBlocks: Omit<TimeBlockInterface, "startTime">[] = [
  {
    id: Date.now(),
    title: "Shower",
    description: "Do the shower",
    hours: 0,
    minutes: 10,
  },
];

export const setupTimeBlockReducerTest = () => {
  const { result } = renderHook(() =>
    useReducer(timeBlockReducer, initialTimeBlocks)
  );

  const [initialState, dispatch] = result.current;

  return { result, initialState, dispatch };
};

describe("timeBlockReducer", () => {
  it("return the initial value", () => {
    const { result } = setupTimeBlockReducerTest();

    const [timeBlocks] = result.current;

    expect(timeBlocks).toBe(initialTimeBlocks);
  });

  it("handles the added action", () => {
    const { result, dispatch } = setupTimeBlockReducerTest();

    const activeCreateId = initialTimeBlocks[0].id;
    const newTimeBlock = {
      id: Date.now(),
      title: "Eat some food",
      description: "Eat the food",
      hours: 0,
      minutes: 30,
    };

    act(() => {
      dispatch({
        type: "added",
        activeCreateId,
        timeBlock: newTimeBlock,
      });
    });

    const [timeBlocks] = result.current;

    expect(timeBlocks.length).toBe(2);
    expect(timeBlocks[1]).toEqual(newTimeBlock);
  });

  it("handles the deleted action", () => {
    const { result, dispatch, initialState } = setupTimeBlockReducerTest();

    const idOfTimeBlockToDelete = initialState[0].id;

    act(() => {
      dispatch({
        type: "deleted",
        index: 0,
      });
    });

    const [timeBlocks] = result.current;

    expect(timeBlocks.length).toBe(0);
    expect(
      timeBlocks.findIndex(
        (timeBlock) => timeBlock.id !== idOfTimeBlockToDelete
      )
    ).toBe(-1);
  });

  it("handles the set-timeBlocks action", () => {
    const { result, dispatch } = setupTimeBlockReducerTest();

    const newTimeBlocks = [
      {
        id: Date.now(),
        title: "Do the thing",
        description: "Do the thing so well",
        hours: 0,
        minutes: 5,
      },
    ];

    act(() => {
      dispatch({
        type: "set-timeBlocks",
        newTimeBlocks,
      });
    });

    const [timeBlocks] = result.current;

    expect(timeBlocks).toEqual(newTimeBlocks);
  });

  it("handles unknown action", () => {
    const { result, dispatch } = setupTimeBlockReducerTest();

    const action = {
      type: "unknownAction",
      otherRandomProp: {},
    };

    expect(() => {
      act(() => {
        // @ts-expect-error This is purposely messed up to test the default case of the reducer
        dispatch(action);
      });
    }).toThrow("Unknown action: " + action);

    const [timeBlocks] = result.current;

    expect(timeBlocks).toEqual(initialTimeBlocks);
  });
});
