import * as React from 'react';
import { TextInput } from 'react-native';
import {DangerZone} from "expo"

const {Animated} = DangerZone;
const {Value, call} = Animated;
const emojis = require("../assets/emoji-db.json");
const emojiList = Object.keys(emojis);

interface TranslationProps {
  index: typeof Value;
  lang: string;
}

export default class Translation extends React.PureComponent<TranslationProps> {

  text = React.createRef();

  setTranslation = ([index]: [number]) => requestAnimationFrame(() => {
    const {lang} = this.props;
    const text = emojis[emojiList[index]][lang]
    this.text.current.setNativeProps({ text });
  })

  render() {
    const {index, style} = this.props;
    return (
      <>
        <Animated.Code>
          {
            () => call([index], this.setTranslation)
          }
        </Animated.Code>
        <TextInput
          ref={this.text}
          underlineColorAndroid="transparent"
          editable={false}
          {...{ style }}
        />
      </>
    );
  }
}
