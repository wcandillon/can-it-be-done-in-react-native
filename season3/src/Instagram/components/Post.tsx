import React, { RefObject } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import Animated, {
  Value,
  block,
  cond,
  diff,
  eq,
  set,
  useCode
} from "react-native-reanimated";
import {
  PinchGestureHandler,
  ScrollView,
  State
} from "react-native-gesture-handler";
import {
  Vector,
  onGestureEvent,
  timing,
  transformOrigin,
  translate
} from "react-native-redash";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const { width } = Dimensions.get("window");
const SIZE = width;
const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover"
  }
});

interface Post {
  user: string;
  picture: {
    uri: string;
  };
  caption: string;
  timestamp: number;
  likes: number;
  avatar: string;
}

interface PostProps {
  post: Post;
  state: Animated.Value<State>;
  pinchRef: RefObject<PinchGestureHandler>;
  pinchRefs: RefObject<PinchGestureHandler>[];
  scrollView: RefObject<ScrollView>;
}

export default ({
  post,
  state,
  pinchRef,
  pinchRefs,
  scrollView
}: PostProps) => {
  const origin = Vector.create(0, 0);
  const pinch = Vector.create(0, 0);
  const focal = Vector.create(0, 0);
  const scale = new Value(1);
  const pinchGestureHandler = onGestureEvent({
    scale,
    state,
    focalX: focal.x,
    focalY: focal.y
  });
  const zIndex = cond(eq(state, State.ACTIVE), 3, 0);
  const adjustedFocal = Vector.add(
    {
      x: -SIZE / 2,
      y: -SIZE / 2
    },
    focal
  );
  // See: https://github.com/kmagiera/react-native-gesture-handler/issues/553
  const pinchBegan =
    Platform.OS === "ios"
      ? eq(state, State.BEGAN)
      : eq(diff(state), State.ACTIVE - State.BEGAN);
  useCode(
    () =>
      block([
        cond(pinchBegan, Vector.set(origin, adjustedFocal)),
        cond(
          eq(state, State.ACTIVE),
          Vector.set(pinch, Vector.invert(Vector.sub(origin, adjustedFocal)))
        ),
        cond(eq(state, State.END), [
          set(pinch.x, timing({ from: pinch.x, to: 0 })),
          set(pinch.y, timing({ from: pinch.y, to: 0 })),
          set(scale, timing({ from: scale, to: 1 }))
        ])
      ]),
    [adjustedFocal, origin, pinch, pinchBegan, scale, state]
  );
  return (
    <>
      <PostHeader avatar={post.avatar} username={post.user} />
      <Animated.View style={{ width: SIZE, height: SIZE, zIndex }}>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={[
            scrollView,
            ...pinchRefs.filter(ref => ref !== pinchRef)
          ]}
          {...pinchGestureHandler}
        >
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.Image
              style={[
                styles.image,
                {
                  transform: [
                    ...translate(pinch),
                    ...transformOrigin(origin, { scale })
                  ]
                }
              ]}
              source={{ uri: post.picture.uri }}
            />
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
      <PostFooter likes={post.likes} caption={post.caption} />
    </>
  );
};
