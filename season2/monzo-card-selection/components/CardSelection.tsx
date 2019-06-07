import React, { useState, useRef, useMemo } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";
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
  onChange,
  cond,
  eq,
  debug
} = Animated;
const INITIAL_INDEX: number = -1;

export default ({ cards }: CardSelectionProps) => {
  const container = useRef<TransitioningView>();
  const [selectedCard, setSelectCard] = useState(INITIAL_INDEX);
  const {
    selectedCardVal,
    cardZIndexes,
    cardRotates,
    fanOutClock,
    springClock,
    spring,
    translationX
  } = useMemo(
    () => ({
      selectedCardVal: new Value(INITIAL_INDEX),
      cardZIndexes: cards.map((_, index) => new Value(index)),
      cardRotates: cards.map(() => new Value(0)),
      fanOutClock: new Clock(),
      springClock: new Clock(),
      spring: new Value(0),
      translationX: new Value(CARD_WIDTH)
    }),
    [cards]
  );
  const selectCard = (index: number) => {
    if (container && container.current) {
      container.current.animateNextTransition();
    }
    setSelectCard(index);
    selectedCardVal.setValue(index);
  };
  useCode(
    block([
      cond(
        eq(selectedCardVal, -1),
        set(cardRotates[0], runSpring(fanOutClock, 0, -15)),
        set(translationX, runSpring(fanOutClock, CARD_WIDTH, 0))
      ),
      set(cardRotates[2], multiply(cardRotates[0], -1))
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
        {useMemo(
          () =>
            cards.map((card, index) => {
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
                      { translateX: translationX },
                      { translateY: 0 }
                    ]
                  }}
                >
                  <Card key={card.id} {...{ card }} />
                </Animated.View>
              );
            }),
          [cardRotates, cardZIndexes, cards, translationX]
        )}
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
