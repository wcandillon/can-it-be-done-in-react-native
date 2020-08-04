import React, { useRef } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  Value,
  useCode,
  startClock,
  set,
  divide,
  cond,
  eq,
  multiply,
  greaterThan,
} from "react-native-reanimated";
import {
  diff,
  useValue,
  useClock,
  withSpringTransition,
} from "react-native-redash";

import Card, { Cards } from "../Transformations/components/Card";
import { useConst } from "../components";

const perspective = 600;
const cards = [
  {
    index: 1,
    type: Cards.Card1,
  },
  {
    index: 2,
    type: Cards.Card2,
  },
  {
    index: 3,
    type: Cards.Card3,
  },
  {
    index: 4,
    type: Cards.Card4,
  },
  {
    index: 5,
    type: Cards.Card5,
  },
  {
    index: 7,
    type: Cards.Card6,
  },
];

const JellyScroll = () => {
  const clock = useClock();
  const y = useValue(0);
  const velocity = useValue(0);
  const onScroll = useConst(() =>
    Animated.event([
      {
        nativeEvent: {
          contentOffset: { y },
        },
      },
    ])
  );
  useCode(
    () => [startClock(clock), set(velocity, divide(diff(y), 1 / 60))],
    []
  );
  const rotation = cond(
    eq(velocity, 0),
    0,
    multiply(cond(greaterThan(velocity, 0), 1, -1), Math.PI / 18)
  );
  const skewY = withSpringTransition(rotation);
  return (
    <Animated.ScrollView
      scrollEventThrottle={1}
      {...{ onScroll }}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
    >
      {cards.map(({ type }, index) => {
        return (
          <Animated.View
            key={index}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 45,
              transform: [{ perspective }, { skewY }],
            }}
          >
            <Card {...{ type }} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default JellyScroll;
