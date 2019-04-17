import * as _ from "lodash";
import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import { DangerZone } from "expo";

import { Emojis, EMOJI_WIDTH } from "./Model";
import Text from "./AnimatedText";

const { Animated } = DangerZone;
const {
  Value, block, call, divide, round, cond, neq, diff,
} = Animated;

interface EnglishWordProps {
  emojis: Emojis;
  x: typeof Value;
}

export default class EnglishWord extends React.PureComponent<EnglishWordProps> {
  text = new Value("");

  componentDidMount() {
    this.setEmoji([0]);
  }

  setEmoji = ([index]) => requestAnimationFrame(() => {
    const { emojis } = this.props;
    const emoji = Object.keys(emojis)[index];
    const text = _.capitalize(emojis[emoji].en);
    this.text.setValue(text);
  });

  render() {
    const { text } = this;
    const { x } = this.props;
    const index = round(divide(x, EMOJI_WIDTH));
    return (
      <React.Fragment>
        <Animated.Code>
          {
            () => block([
              cond(neq(diff(index), 0), call([index], this.setEmoji)),
            ])
          }
        </Animated.Code>
        <AnimatedText style={styles.text} {...{ text }} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 48,
    textAlign: "center",
    fontSize: 48,
    color: "black",
    fontWeight: "bold",
  },
});
