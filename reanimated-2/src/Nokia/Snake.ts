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
    tail: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
  });
  useEffect(() => {
    setInterval(() => {
      const { tail, direction } = snake.value;
      snake.value = {
        ...snake.value,
        tail: tail.map((v) => ({
          x: v.x + direction.x,
          y: v.y + direction.y,
        })),
      };
    }, 500);
  }, [snake]);
  return snake;
};
