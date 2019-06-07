import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { runSpring, bInterpolate } from "react-native-redash";

import Card, { Card as CardModel, CARD_WIDTH } from "./Card";
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
  multiply,
  cond,
  eq,
  clockRunning,
  onChange,
  debug
} = Animated;

const INITIAL_INDEX: number = -1;

export default ({ cards }: CardSelectionProps) => {
  const selectedCard = new Value(INITIAL_INDEX);
  const cardZIndexes = cards.map((_, index) => new Value(index));
  const cardRotates = cards.map(() => new Value(0));
  const spring = new Value(0);
  const cardRotatesClock = new Clock();
  const translationX = new Value(CARD_WIDTH);
  const selectCard = (index: number) => selectedCard.setValue(index);
  useCode(
    block([
      set(cardRotates[2], multiply(cardRotates[0], -1)),
      cond(eq(selectedCard, INITIAL_INDEX), [
        set(spring, runSpring(cardRotatesClock, 0, 1)),
        set(cardRotates[0], bInterpolate(spring, 0, -15)),
        set(cardRotates[2], bInterpolate(spring, 0, 15))
      ]),
      cond(eq(selectedCard, 0), [
        set(spring, runSpring(cardRotatesClock, 0, 1)),
        set(cardRotates[0], bInterpolate(spring, 0, -7.5)),
        set(cardRotates[1], bInterpolate(spring, 0, 7.5)),
        set(cardRotates[2], bInterpolate(spring, 15, 0)),
        set(translationX, bInterpolate(spring, translationX, 0))
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
                  { translateX: translationX }
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
