import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, WebView, Text } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Constants from "expo-constants";
import Animated from "react-native-reanimated";
import { snapPoint, onGestureEvent, approximates } from "react-native-redash";
import { TabModel, OVERVIEW } from "./Model";
import spring from "./Spring";

const { Value, cond, useCode, abs, call } = Animated;

const { width } = Dimensions.get("window");
const EXTREMITY = width * 1.1;
const snapPoints = [-EXTREMITY, 0, EXTREMITY];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden"
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center"
  },
  webView: { flex: 1 }
});

interface ContentProps {
  tab: TabModel;
  closeTab: () => void;
  selectedTab: number;
}

export default ({
  tab: { uri, id: title },
  closeTab,
  selectedTab
}: ContentProps) => {
  const webView = useRef<WebView>(null);
  const { gestureEvent, translateX } = useMemo(() => {
    const translationX = new Value(0);
    const velocityX = new Value(0);
    const state = new Value(State.UNDETERMINED);
    return {
      gestureEvent: onGestureEvent({
        translationX,
        velocityX,
        state
      }),
      translateX: spring(
        translationX,
        state,
        snapPoint(translationX, velocityX, snapPoints)
      )
    };
  }, []);
  useCode(
    cond(approximates(abs(translateX), EXTREMITY, 10), call([], closeTab)),
    [translateX, closeTab]
  );
  const offset = selectedTab === OVERVIEW ? 0 : Constants.statusBarHeight;
  return (
    <PanGestureHandler activeOffsetX={[-10, 10]} {...gestureEvent}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
      >
        <View
          style={{
            paddingTop: offset,
            height: 32 + offset,
            backgroundColor: "#fefefe",
            justifyContent: "center"
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.webView}>
          <WebView ref={webView} source={{ uri }} style={styles.webView} />
          <View style={StyleSheet.absoluteFill} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
