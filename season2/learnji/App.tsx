import * as _ from "lodash";
import React from "react";
import {
  StyleSheet, View, Dimensions,
} from "react-native";
import { DangerZone } from "expo";

import Emojis from "./components/Emojis";
import { EMOJI_WIDTH, EMOJIS_OFFSET } from "./components/Model";
import Translations from "./components/Translations";
import { onScroll } from "./components/AnimationHelpers";
import AnimatedText from "./components/AnimatedText";

const { Animated } = DangerZone;
const {
  Value, block, call, divide, round, cond, neq, diff,
} = Animated;
const emojis = require("./assets/emoji-db.json");

const { height } = Dimensions.get("window");
const horizontalPanHeight = EMOJI_WIDTH;
const verticalPanHeight = height / 2 - horizontalPanHeight / 2;
const numberOfEmojis = Object.keys(emojis).length;

export default class App extends React.PureComponent<{}> {
  en = new Value("");

  de = new Value("");

  it = new Value("");

  fr = new Value("");

  es = new Value("");

  pt = new Value("");

  zhHant = new Value("");

  ko = new Value("");

  ja = new Value("");

  componentDidMount() {
    this.setEmoji([0]);
  }

  setEmoji = ([index]) => requestAnimationFrame(() => {
    const emoji = Object.keys(emojis)[index];
    const translations = emojis[emoji];
    this.en.setValue(_.capitalize(translations.en));
    this.de.setValue(_.capitalize(translations.de));
    this.it.setValue(_.capitalize(translations.it));
    this.fr.setValue(_.capitalize(translations.fr));
    this.es.setValue(_.capitalize(translations.es));
    this.zhHant.setValue(_.capitalize(translations.zh_Hant));
    this.ko.setValue(_.capitalize(translations.ko));
    this.ja.setValue(_.capitalize(translations.ja));
  });

  render() {
    const { en } = this;
    const x = new Value(0);
    const y = new Value(0);
    const index = round(divide(x, EMOJI_WIDTH));
    return (
      <View style={styles.container}>
        <Animated.Code>
          {
            () => block([
              cond(neq(diff(index), 0), call([index], this.setEmoji)),
            ])
          }
        </Animated.Code>
        <View style={styles.container}>
          <Translations {...{ emojis, y }} />
        </View>
        <Emojis {...{ emojis, x }} />
        <View style={styles.container}>
          <AnimatedText style={styles.english} text={en} />
        </View>
        <Animated.ScrollView
          style={styles.verticalPan}
          contentContainerStyle={styles.verticalPanContent}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll({ y })}
          scrollEventThrottle={1}
          vertical
        />
        <Animated.ScrollView
          style={styles.horizontalPan}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalPanContent}
          onScroll={onScroll({ x })}
          scrollEventThrottle={1}
          snapToInterval={EMOJI_WIDTH}
          decelerationRate="fast"
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalPan: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: verticalPanHeight,
  },
  verticalPanContent: {
    height: (verticalPanHeight + EMOJIS_OFFSET) * 2,
  },
  horizontalPan: {
    position: "absolute",
    top: verticalPanHeight,
    left: 0,
    height: horizontalPanHeight,
  },
  horizontalPanContent: {
    width: EMOJI_WIDTH * numberOfEmojis,
  },
  english: {
    margin: 48,
    textAlign: "center",
    fontSize: 48,
    color: "black",
    fontWeight: "bold",
  },
});
