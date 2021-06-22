import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Vector } from "react-native-redash";

import { contains, randomVector } from "./Math";

export const UP = { x: 0, y: -1 };
export const DOWN = { x: 0, y: 1 };
export const LEFT = { x: -1, y: 0 };
export const RIGHT = { x: 1, y: 0 };

export interface Snake {
  tail: Vector[];
  food: Vector;
  direction: Vector;
}

export const useSnake = (width: number, height: number) => {
  const state = useSharedValue({
    tail: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
    food: randomVector(width, height),
    direction: RIGHT,
  });
  useEffect(() => {
    setInterval(() => {
      const {
        food,
        direction,
        tail: [head, ...tail],
      } = state.value;
      const last = tail[tail.length - 1];
      const newTail = [
        ...tail,
        { x: last.x + direction.x, y: last.y + direction.y },
      ];
      const foodEaten = contains(newTail, food);
      state.value = {
        ...state.value,
        tail: foodEaten
          ? [
              head,
              ...tail,
              { x: last.x + direction.x, y: last.y + direction.y },
            ]
          : newTail,
        food: foodEaten ? randomVector(width, height) : food,
      };
    }, 300);
  }, [height, state, width]);
  return state;
};

export type Foo = Snake;
export const F = [LEFT, RIGHT, UP, DOWN];
