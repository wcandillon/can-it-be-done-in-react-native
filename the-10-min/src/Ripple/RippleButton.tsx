import React, { Children, ReactElement, ReactNode, useState } from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  and,
  call,
  cond,
  diff,
  eq,
  greaterOrEq,
  greaterThan,
  neq,
  onChange,
  or,
  useCode,
} from "react-native-reanimated";
import { StyleSheet, View, ViewProps } from "react-native";
import {
  mix,
  translate,
  useDebug,
  useTapGestureHandler,
  vec,
  withTransition,
} from "react-native-redash";
import Color from "color";

interface RippleButtonProps {
  children: ReactElement<ViewProps>;
  color: string;
  onPress?: () => void;
}

const RippleButton = ({ children, color, onPress }: RippleButtonProps) => {
  const [radius, setRadius] = useState(-1);
  const { gestureHandler, position, state } = useTapGestureHandler();
  const child = Children.only(children);
  const progress = withTransition(eq(state, State.BEGAN));
  const isGoingUp = or(greaterThan(diff(progress), 0), eq(progress, 1));
  const scale = mix(progress, 0.001, 1);
  const opacity = isGoingUp;
  const backgroundColor = Color(color).lighten(0.1);
  useCode(
    () => [
      onChange(
        state,
        cond(eq(state, State.END), [call([], onPress || (() => null))])
      ),
    ],
    [onPress]
  );
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View {...child.props} style={[child.props.style]}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 14,
            backgroundColor: color,
            overflow: "hidden",
          }}
          onLayout={({
            nativeEvent: {
              layout: { height, width },
            },
          }) => setRadius(Math.sqrt(width ** 2 + height ** 2))}
        >
          {radius !== -1 && (
            <Animated.View
              style={{
                opacity,
                backgroundColor,
                borderRadius: radius,
                width: radius * 2,
                height: radius * 2,
                transform: [
                  ...translate(vec.create(-radius)),
                  ...translate(position),
                  { scale },
                ],
              }}
            />
          )}
        </View>
        {child.props.children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default RippleButton;
