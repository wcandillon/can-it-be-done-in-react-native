import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";
import { Vector } from "react-native-redash";

export const UP = { x: 0, y: -1 };
export const DOWN = { x: 0, y: 1 };
export const LEFT = { x: -1, y: 0 };
export const RIGHT = { x: 1, y: 0 };

export interface Snake {
  tail: Vector[];
  food: Vector;
  direction: Vector;
}

export const useSnake = () => {
  const snake = useSharedValue<Snake>({
    direction: RIGHT,
    tail: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
    food: { x: 5, y: 5 },
  });
  useEffect(() => {
    setInterval(() => {
      const {
        tail: [, ...tail],
        direction,
      } = snake.value;
      const last = tail[tail.length - 1];
      snake.value = {
        ...snake.value,
        tail: [
          ...tail,
          {
            x: last.x + direction.x,
            y: last.y + direction.y,
          },
        ],
      };
    }, 500);
  }, [snake]);
  return snake;
};
