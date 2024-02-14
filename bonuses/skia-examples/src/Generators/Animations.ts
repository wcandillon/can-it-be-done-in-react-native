import { useEffect, useState } from "react";
import type { SharedValue } from "react-native-reanimated";
import {
  Easing,
  interpolate,
  useSharedValue,
  useFrameCallback,
  makeMutable,
  cancelAnimation,
} from "react-native-reanimated";

type EasingFunction = (value: number) => number;

type Input = (() => Generator) | Generator;
type Inputs = Input[];

const materializeGenerator = (input: Input) => {
  "worklet";
  return typeof input === "function" ? input() : input;
};

interface TimingConfig {
  to?: number;
  easing?: EasingFunction;
  duration?: number;
}

const defaultTimingConfig: Required<TimingConfig> = {
  to: 1,
  easing: Easing.inOut(Easing.ease),
  duration: 600,
};

export function* timeSincePreviousFrame() {
  "worklet";
  const time: number = yield;
  return time;
}

export function* timing(value: SharedValue<number>, rawConfig?: TimingConfig) {
  "worklet";
  const from = value.value;
  const { to, easing, duration } = { ...defaultTimingConfig, ...rawConfig };
  const start: number = yield;
  const end = start + duration;
  for (let current = start; current < end; ) {
    const progress = easing((current - start) / duration);
    const val = interpolate(progress, [0, 1], [from, to]);
    value.value = val;
    current += yield* timeSincePreviousFrame();
  }
  value.value = to;
}

export function* wait(duration = 1000) {
  "worklet";
  const from: number = yield;
  const to = from + duration;
  for (let current = from; current < to; ) {
    current += yield* timeSincePreviousFrame();
  }
}

export function* waitUntil(value: SharedValue<boolean>, invert = false) {
  "worklet";
  while (invert ? value.value : !value.value) {
    yield;
  }
}

export function* parallel(...inputs: Inputs) {
  "worklet";
  const iterators = inputs.map((input) => materializeGenerator(input));
  let isDone = false;
  let timeSinceFirstFrame = 0;
  while (!isDone) {
    const done = [];
    for (const iterator of iterators) {
      const val = iterator.next(timeSinceFirstFrame);
      done.push(val.done);
    }
    isDone = done.every((d) => d);
    if (!isDone) {
      timeSinceFirstFrame = yield;
    }
  }
}

export function* stagger(delay: number, ...inputs: Inputs) {
  "worklet";
  const iterators = inputs.map((input, index) => {
    return (function* () {
      yield* wait(delay * index);
      yield* materializeGenerator(input);
    })();
  });

  yield* parallel(...iterators);
}

type AnimationValues<S> = {
  [K in keyof S]: SharedValue<S[K]>;
};

type AnimationState = Record<string, unknown>;
type Animation<S extends AnimationState> = {
  animation: (state: AnimationValues<S>) => Generator;
  state: S;
};

export const makeAnimation = <S extends AnimationState>(
  animation: (state: AnimationValues<S>) => Generator,
  state: S
) => {
  return {
    animation,
    state,
  };
};

const useSharedValues = <S extends AnimationState>(state: S) => {
  const [mutable] = useState(() => {
    const values = {} as AnimationValues<S>;
    for (const key in state) {
      values[key] = makeMutable(state[key]);
    }
    return values;
  });
  useEffect(() => {
    return () => {
      Object.keys(mutable).forEach((element) => {
        cancelAnimation(mutable[element]);
      });
    };
  }, [mutable]);
  return mutable;
};

export const useAnimation = <S extends AnimationState>(
  input: Animation<S> | (() => Generator),
  pause?: SharedValue<boolean>
) => {
  const offset = useSharedValue(0);
  const { animation, state } =
    typeof input === "function" ? { animation: input, state: {} as S } : input;
  const values = useSharedValues(state);
  const gen = useSharedValue<null | Generator>(null);
  useFrameCallback(({ timeSincePreviousFrame: ts }) => {
    if (gen.value === null) {
      gen.value = animation(values);
    }
    if (pause?.value) {
      offset.value += ts ?? 0;
    } else {
      gen.value.next(ts);
    }
  });
  return values;
};
