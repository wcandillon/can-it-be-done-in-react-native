import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Vector } from "react-native-redash";

import { randomVector } from "./Math";

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
  const snake = useSharedValue<Snake>({
    direction: RIGHT,
    tail: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
    food: randomVector(width, height),
  });
  useEffect(() => {
    setInterval(() => {
      const {
        tail: [, ...tail],
        direction,
        food,
      } = snake.value;
      const last = tail[tail.length - 1];
      const newTail = [
        ...tail,
        {
          x: last.x + direction.x,
          y: last.y + direction.y,
        },
      ];
      const foodEaten =
        newTail.filter((v) => v.x === food.x && v.y === food.y).length > 0;
      snake.value = {
        ...snake.value,
        tail: foodEaten
          ? [
              ...newTail,
              {
                x: last.x + 2 * direction.x,
                y: last.y + 2 * direction.y,
              },
            ]
          : newTail,
        food: foodEaten ? randomVector(width, height) : food,
      };
    }, 500);
  }, [height, snake, width]);
  return snake;
};
