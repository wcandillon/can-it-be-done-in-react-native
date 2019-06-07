import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, runTiming } from "react-native-redash";

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
  defined,
  diff,
  clockRunning,
  onChange,
  debug,
  neq,
  not,
  Extrapolate
} = Animated;

const INITIAL_INDEX: number = -1;
const timing = (clock: Animated.Clock) =>
  runTiming(clock, 0, { toValue: 1, duration: 400, easing: Easing.linear });

export default ({ cards }: CardSelectionProps) => {
  const selectedCard = new Value(INITIAL_INDEX);
  const indexHasChanged = new Value(INITIAL_INDEX);
  const cardZIndexes = cards.map((_, index) => new Value(index));
  const cardRotates = cards.map(() => new Value(0));
  const cardTranslatesY = cards.map(() => new Value(0));
  const spring = new Value(0);
  const clock = new Clock();
  const translationX = new Value(CARD_WIDTH);
  const firstSelectionIsDone = new Value(0);
  const selectCard = (index: number) => {
    indexHasChanged.setValue(0);
    selectedCard.setValue(index);
  };
  useCode(
    block([
      onChange(selectedCard, set(indexHasChanged, 1)),
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
      cond(and(firstSelectionIsDone, eq(selectedCard, 0), indexHasChanged), [
        set(spring, timing(clock)),
        set(
          cardRotates[0],
          interpolate(spring, {
            inputRange: [0, 0.5, 1],
            outputRange: [cardRotates[0], 45, 0]
          })
        ),
        set(
          cardTranslatesY[0],
          interpolate(spring, {
            inputRange: [0, 0.5, 1],
            outputRange: [0, -CARD_HEIGHT * 1.5, 0],
            extrapolate: Extrapolate.CLAMP
          })
        ),
        set(cardZIndexes[0], cond(greaterOrEq(spring, 0.5), 10, 0))
      ])
    ]),
    [cards]
  );
  return (
    <View style={styles.container}>
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
    </View>
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
