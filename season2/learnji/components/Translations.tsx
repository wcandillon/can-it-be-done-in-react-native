import * as React from "react";
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView,
} from "react-native";
import { DangerZone } from "expo";
import { Emojis } from "./Model";
import AnimatedText from "./AnimatedText";

const { Animated } = DangerZone;
const {
  Value, debug, multiply, max,
} = Animated;
const { width } = Dimensions.get("window");

const colors = {
  de: "#3e3a3f",
  it: "#448d5d",
  fr: "#638fcf",
  es: "#803758",
  pt: "#e74446",
  zhHant: "#d1413d",
  ko: "#1f5593",
  ja: "#f9dde0",

};

const flags = {
  de: "🇩🇪",
  it: "🇮🇹",
  fr: "🇫🇷",
  es: "🇪🇸",
  pt: "🇵🇹",
  zhHant: "🇨🇳",
  ko: "🇰🇷",
  ja: "🇯🇵",
};

interface TranslationsProps {
  y: typeof Value;
  emojis: Emojis;
  max: number;
  translations: {
    de: typeof Value;
    it: typeof Value,
    fr: typeof Value,
    es: typeof Value,
    pt: typeof Value,
    zhHant: typeof Value,
    ko: typeof Value,
    ja: typeof Value,
  }
}

export default class Translations extends React.PureComponent<TranslationsProps> {
  render() {
    const {
      y, x, max: maxVal, translations,
    } = this.props;
    const translateY = max(multiply(y, -1), maxVal);
    const translateX = multiply(x, -1);
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          flexDirection: "row",
          transform: [{ translateY }, { translateX }],
        }}
        horizontal
        snapPoint={width}
      >
        {
          Object.keys(colors).map(lang => (
            <SafeAreaView key={lang} style={{ width, height: "100%", backgroundColor: colors[lang] }}>
              <Text style={styles.flag}>{flags[lang]}</Text>
              <AnimatedText text={translations[lang]} style={styles.translation} />
            </SafeAreaView>
          ))
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
  },
  flag: {
    textAlign: "center",
    fontSize: 24,
  },
  translation: {
    margin: 48,
    textAlign: "center",
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
});
