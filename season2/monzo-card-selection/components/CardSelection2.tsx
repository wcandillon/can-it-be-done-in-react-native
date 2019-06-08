import React, { useState, useRef, useMemo } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";
import { bInterpolate, runTiming, max } from "react-native-redash";

import Card, { Card as CardModel, CARD_WIDTH, CARD_HEIGHT } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";

interface CardSelectionProps {
  cards: [CardModel, CardModel, CardModel];
}

const {
  useCode,
  Clock,
  Value,
  concat,
  block,
  set,
  add,
  multiply,
  cond,
  eq,
  and,
  greaterOrEq,
  interpolate,
  clockRunning,
  neq,
  not,
  Extrapolate,
  onChange,
  debug
} = Animated;

const INITIAL_INDEX: number = -1;
const timing = (clock: Animated.Clock) =>
  runTiming(clock, 0, { toValue: 1, duration: 400, easing: Easing.linear });

export default ({ cards }: CardSelectionProps) => {
  const container = useRef<TransitioningView>();
  const {
    selectedCard,
    nextIndex,
    cardZIndexes,
    cardRotates,
    cardTranslatesY,
    spring,
    clock,
    translationX,
    firstSelectionIsDone,
    shouldUpdateZIndexes
  } = useMemo(
    () => ({
      selectedCard: new Value(INITIAL_INDEX),
      nextIndex: new Value(INITIAL_INDEX),
      cardZIndexes: cards.map((_, index) => new Value(index)),
      cardRotates: cards.map(() => new Value(0)),
      cardTranslatesY: cards.map(() => new Value(0)),
      spring: new Value(0),
      clock: new Clock(0),
      translationX: new Value(CARD_WIDTH),
      firstSelectionIsDone: new Value(0),
      shouldUpdateZIndexes: new Value(1)
    }),
    [cards]
  );
  const selectCard = (index: number) => {
    if (container && container.current) {
      container.current.animateNextTransition();
    }
    nextIndex.setValue(index);
  };
  useCode(
    block([
      onChange(nextIndex, [
        cond(
          and(not(clockRunning(clock)), neq(nextIndex, selectedCard)),
          set(selectedCard, nextIndex)
        )
      ]),
      cond(eq(selectedCard, INITIAL_INDEX), [
        set(spring, timing(clock)),
        set(cardRotates[0], bInterpolate(spring, 0, -15)),
        set(cardRotates[1], 0),
        set(cardRotates[2], bInterpolate(spring, 0, 15))
      ]),
      cond(and(neq(selectedCard, INITIAL_INDEX), not(firstSelectionIsDone)), [
        set(spring, timing(clock)),
        set(cardRotates[0], bInterpolate(spring, 0, -7.5)),
        set(cardRotates[1], bInterpolate(spring, 0, 7.5)),
        set(cardRotates[2], bInterpolate(spring, 15, 0)),
        set(translationX, bInterpolate(spring, translationX, 0)),
        cond(not(clockRunning(clock)), set(firstSelectionIsDone, 1))
      ]),
      ...cards.map((_, index) =>
        cond(and(firstSelectionIsDone, eq(selectedCard, index)), [
          set(spring, timing(clock)),
          ...cards
            .map((_c, i) => i)
            .filter((_c, i) => i !== index)
            .map((absoluteIndex, i) =>
              set(
                cardRotates[absoluteIndex],
                bInterpolate(
                  spring,
                  cardRotates[absoluteIndex],
                  7.5 * (i % 2 === 0 ? -1 : 1)
                )
              )
            ),
          set(
            cardRotates[index],
            interpolate(spring, {
              inputRange: [0, 0.5, 1],
              outputRange: [cardRotates[index], 45, 0]
            })
          ),
          set(
            cardTranslatesY[index],
            interpolate(spring, {
              inputRange: [0, 0.5, 1],
              outputRange: [0, -CARD_HEIGHT * 1.5, 0],
              extrapolate: Extrapolate.CLAMP
            })
          ),
          cond(and(greaterOrEq(spring, 0.5), shouldUpdateZIndexes), [
            set(
              cardZIndexes[index],
              add(cardZIndexes[index], add(max(...cardZIndexes), 10))
            ),
            set(shouldUpdateZIndexes, 0)
          ]),
          cond(not(clockRunning(clock)), set(shouldUpdateZIndexes, 1))
        ])
      )
    ]),
    [cards]
  );
  return (
    <Transitioning.View
      ref={container}
      style={styles.container}
      transition={<Transition.In type="fade" durationMs={100} />}
    >
      <View style={styles.cards}>
        {cards.map((card, index) => {
          const zIndex = cardZIndexes[index];
          const rotateZ = concat(cardRotates[index] as any, "deg" as any);
          const translateY = cardTranslatesY[index];
          return (
            <Animated.View
              key={card.id}
              style={{
                zIndex,
                elevation: zIndex,
                ...StyleSheet.absoluteFillObject,
                transform: [
                  { translateX: multiply(translationX, -1) },
                  { rotateZ },
                  { translateX: translationX },
                  { translateY }
                ]
              }}
            >
              <Card key={card.id} {...{ card }} />
            </Animated.View>
          );
        })}
      </View>
      <SafeAreaView>
        {cards.map(({ id, name, color, thumbnail }, index) => (
          <RectButton key={id} onPress={() => selectCard(index)}>
            <View style={styles.button} accessible>
              <Thumbnail {...{ thumbnail }} />
              <View style={styles.label}>
                <Text>{name}</Text>
              </View>
              <Animated.View
                style={{
                  opacity: cond(eq(selectedCard, index), 1, 0),
                  alignSelf: "center"
                }}
              >
                <CheckIcon {...{ color }} />
              </Animated.View>
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cards: {
    flex: 1,
    backgroundColor: "#f4f6f3"
  },
  button: {
    flexDirection: "row"
  },
  label: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f6f3",
    justifyContent: "center"
  }
});
