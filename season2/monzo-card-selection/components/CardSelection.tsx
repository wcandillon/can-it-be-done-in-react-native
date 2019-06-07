import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";
import { runSpring } from "react-native-redash";

import Card, { Card as CardModel, CARD_WIDTH } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";
import { useValues } from "./hookah";

interface CardSelectionProps {
  cards: [CardModel, CardModel, CardModel];
}

const { useCode, Clock, Value, concat, block, set, multiply } = Animated;

export default ({ cards }: CardSelectionProps) => {
  const [selectedCard, setSelectCard] = useState(-1);
  const { cardZIndexes, cardRotates, clock } = useValues({
    cardZIndexes: cards.map((_, index) => new Value(index)),
    cardRotates: cards.map(() => new Value(0)),
    clock: new Clock()
  });
  const container = useRef<TransitioningView>();
  const transition = <Transition.In type="fade" durationMs={100} />;
  const selectCard = (index: number) => {
    if (container && container.current) {
      container.current.animateNextTransition();
    }
    setSelectCard(index);
  };
  useCode(
    block([
      set(cardRotates[0], runSpring(clock, 0, -15)),
      set(cardRotates[2], multiply(cardRotates[0], -1))
    ]),
    []
  );
  return (
    <Transitioning.View
      ref={container}
      style={styles.container}
      {...{ transition }}
    >
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
                  { translateX: -CARD_WIDTH },
                  { rotateZ },
                  { translateX: CARD_WIDTH }
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
              {selectedCard === index && <CheckIcon {...{ color }} />}
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
