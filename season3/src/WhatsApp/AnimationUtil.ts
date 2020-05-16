import Animated, { block, set } from "react-native-reanimated";
import { Vector, clamp, decay } from "react-native-redash";

export const decayVector = (
  offset: Vector<Animated.Value<number>>,
  panVelocity: Vector<Animated.Node<number>>,
  minVec: Vector<Animated.Node<number>>,
  maxVec: Vector<Animated.Node<number>>,
  clock: Vector<Animated.Clock>
) =>
  block([
    set(
      offset.x,
      clamp(
        decay({
          from: offset.x,
          velocity: panVelocity.x,
          clock: clock.x,
        }),
        minVec.x,
        maxVec.x
      )
    ),
    set(
      offset.y,
      clamp(
        decay({
          from: offset.y,
          velocity: panVelocity.y,
          clock: clock.y,
        }),
        minVec.y,
        maxVec.y
      )
    ),
  ]);
