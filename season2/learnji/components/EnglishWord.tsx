import * as _ from "lodash";
import * as React from "react";
import { TextInput, StyleSheet } from "react-native";
import { DangerZone } from "expo";

import { Emojis, EMOJI_WIDTH } from "./Model";

const { Animated } = DangerZone;
const {
  Value, block, call, divide, round, cond, neq, diff,
} = Animated;

interface EnglishWordProps {
  emojis: Emojis;
  x: typeof Value;
}

export default class EnglishWord extends React.PureComponent<EnglishWordProps> {
  text = React.createRef();

  componentDidMount() {
    this.setEmoji([0]);
  }

  setEmoji = ([index]) => requestAnimationFrame(() => {
    const { emojis } = this.props;
    const emoji = Object.keys(emojis)[index];
    const text = _.capitalize(emojis[emoji].en);
    this.text.current.setNativeProps({ text });
  });

  render() {
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
        <TextInput
          ref={this.text}
          underlineColorAndroid="transparent"
          style={styles.text}
          editable={false}
        />
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
