import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated from "react-native-reanimated";
import * as path from "svg-path-properties";
import { gestureEvent, decay } from "react-native-redash";

import { Channel } from "./Model";
import ChannelIcon from "./ChannelIcon";

const { Value, concat, debug, block } = Animated;
const { width } = Dimensions.get("window");
const height = width / 1.4;
const D = width * 1.2;
const R = D / 2;
const circle = (r: number, cx: number, cy: number) => `M ${cx - r}, ${cy}
a ${r},${r} 0 1,0 ${r * 2},0
a ${r},${r} 0 1,0 ${-r * 2},0`;
const styles = StyleSheet.create({
  container: {
    width,
    height
  }
});

interface CircularSelectionProps {
  channels: Channel[];
}

export default ({ channels }: CircularSelectionProps) => {
  const l = Math.sin(Math.PI / channels.length);
  const r = (R * l) / (1 - l);
  const outerR = R + 2 * r;
  const midR = R + r;
  const cx = width / 2;
  const cy = outerR;
  const outerPath = circle(outerR, cx, cy);
  const d = circle(midR, cx, cy);
  const properties = path.svgPathProperties(d);
  const segment = properties.getTotalLength() / channels.length;
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = gestureEvent({
    translationX,
    velocityX,
    state
  });
  const translateX = decay(translationX, state, velocityX);
  const rotateZ = block([
    debug("translateX", translateX),
    concat(translateX, "deg")
  ]);
  return (
    <View style={{ width, height }}>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="50%">
            <Stop offset="0" stopColor="#353637" />
            <Stop offset="1" stopColor="#1c1d1e" />
          </LinearGradient>
        </Defs>
        <Path fill="#3498db" d={outerPath} />
      </Svg>
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(142, 68, 173, 0.5)",
            transform: [
              { translateX: 0 },
              { translateY: 0 },
              { rotateZ },
              { translateX: 0 },
              { translateY: 0 }
            ]
          }}
        >
          {channels.map((channel, index) => {
            const { x, y } = properties.getPointAtLength(index * segment);
            return (
              <View
                key={index}
                style={{ position: "absolute", top: y - r, left: x - r }}
              >
                <ChannelIcon name={`${index + 1}`} radius={r} />
              </View>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
