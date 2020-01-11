import React, { ReactNode } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  and,
  block,
  call,
  cond,
  eq,
  set,
  useCode
} from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { between, onGestureEvent, useValues } from "react-native-redash";
import { useNavigation } from "react-navigation-hooks";
import { Navigation } from "../IPodNavigator";

export enum Command {
  UNDETERMINED,
  CENTER,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}

const { width } = Dimensions.get("window");
export const size = 0.75 * (width - 32);
const BUTTON_SIZE = size / 3;
const TOP = {
  x: BUTTON_SIZE,
  y: 0
};
const BOTTOM = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE * 2
};
const LEFT = {
  x: 0,
  y: BUTTON_SIZE
};
const CENTER = {
  x: BUTTON_SIZE,
  y: BUTTON_SIZE
};
const RIGHT = {
  x: BUTTON_SIZE * 2,
  y: BUTTON_SIZE
};

const isInRegion = (
  x: Animated.Node<number>,
  y: Animated.Node<number>,
  region: { x: number; y: number }
) => {
  return and(
    between(x, region.x, region.x + BUTTON_SIZE),
    between(y, region.y, region.y + BUTTON_SIZE)
  );
};

export const useOnPress = (
  command: Animated.Value<Command>,
  target: Command,
  onPress: (navigation: Navigation) => void,
  active: Animated.Adaptable<number> = 1
) => {
  const navigation = useNavigation();
  useCode(
    () =>
      cond(and(active, eq(command, target)), [
        call([], () => onPress(navigation)),
        set(command, Command.UNDETERMINED)
      ]),
    [active, command, navigation, onPress, target]
  );
};

interface ButtonsProps {
  command: Animated.Value<Command>;
  children: ReactNode;
}

export default ({ command, children }: ButtonsProps) => {
  const [state, x, y] = useValues([State.UNDETERMINED, 0, 0], []);
  const tapGestureHandler = onGestureEvent({ state, x, y });
  useCode(
    () =>
      block([
        cond(eq(state, State.END), [
          cond(
            isInRegion(x, y, TOP),
            set(command, Command.TOP),
            cond(
              isInRegion(x, y, BOTTOM),
              set(command, Command.BOTTOM),
              cond(
                isInRegion(x, y, LEFT),
                set(command, Command.LEFT),
                cond(
                  isInRegion(x, y, RIGHT),
                  set(command, Command.RIGHT),
                  cond(
                    isInRegion(x, y, CENTER),
                    set(command, Command.CENTER),
                    set(command, Command.UNDETERMINED)
                  )
                )
              )
            )
          ),
          set(state, State.UNDETERMINED)
        ])
      ]),
    [command, state, x, y]
  );
  return (
    <TapGestureHandler {...tapGestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
    </TapGestureHandler>
  );
};
