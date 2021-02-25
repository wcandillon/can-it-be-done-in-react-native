import { AnimationState, defineAnimation } from "react-native-redash";

const VELOCITY = 150;

interface BouncingAnimationState extends AnimationState {
  lastTimestamp: number;
  direction: -1 | 1;
}

export const withBouncing = (
  lowerBound: number,
  upperBound: number,
  onBounce?: () => void
): number => {
  "worklet";
  return defineAnimation<BouncingAnimationState>(() => {
    "worklet";
    const onFrame = (state: BouncingAnimationState, now: number) => {
      const { lastTimestamp, direction } = state;
      const dt = now - lastTimestamp;
      state.current += VELOCITY * (dt / 1000) * direction;
      if (state.current > upperBound || state.current < lowerBound) {
        state.direction *= -1;
        onBounce?.();
      }
      state.lastTimestamp = now;
      return false;
    };
    const onStart = (state: BouncingAnimationState, _: number, now: number) => {
      state.lastTimestamp = now;
      state.current = lowerBound + Math.random() * upperBound;
      state.direction = 1;
    };
    return {
      onFrame,
      onStart,
    };
  });
};
