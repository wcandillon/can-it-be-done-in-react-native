import { State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { runSpring } from "react-native-redash";

const { Clock, Value, cond, eq, set, stopClock } = Animated;

const spring = (
  translation: Animated.Value<number>,
  state: Animated.Value<State>,
  destination: Animated.Adaptable<number>
) => {
  const clock = new Clock();
  // http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
  const springConfig = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001
  };
  return cond(
    eq(state, State.END),
    set(translation, runSpring(clock, translation, destination, springConfig)),
    [cond(eq(state, State.BEGAN), stopClock(clock)), translation]
  );
};

export default spring;
