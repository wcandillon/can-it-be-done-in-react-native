import React, { Children, ReactNode, useState } from "react";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { cond, eq, neq } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import {
  mix,
  translate,
  useDebug,
  useTapGestureHandler,
  vec,
  withTransition,
} from "react-native-redash";

interface RippleButtonProps {
  children: ReactNode;
  color: string;
}

const RippleButton = ({ children, color }: RippleButtonProps) => {
  const [radius, setRadius] = useState(-1);
  const { gestureHandler, position, state } = useTapGestureHandler();
  const child = Children.only(children);
  const progress = withTransition(eq(state, State.BEGAN));
  //  cond(eq(state, State.END), 0, withTransition(eq(state, State.BEGAN)));
  const scale = mix(progress, 0.001, 1);
  useDebug({ progress });
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View {...child.props} style={[child.props.style]}>
        <View
          style={{ ...StyleSheet.absoluteFillObject, overflow: "hidden" }}
          onLayout={({
            nativeEvent: {
              layout: { height, width },
            },
          }) => setRadius(Math.max(width, height))}
        >
          {radius !== -1 && (
            <Animated.View
              style={{
                backgroundColor: color,
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
