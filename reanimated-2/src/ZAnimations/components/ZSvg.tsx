import React, { Children, ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import Svg from "react-native-svg";

import Camera from "./Camera";
import { Vector3 } from "./Vector";

const Context = React.createContext<ZSvgContext | null>(null);
const ZIndexContext = React.createContext<Animated.SharedValue<number> | null>(
  null
);

export const useZSvg = () => {
  const ctx = useContext(Context);
  if (ctx === null) {
    throw new Error("No provider found");
  }
  return ctx;
};

export const useZIndex = () => {
  const ctx = useContext(ZIndexContext);
  if (ctx === null) {
    throw new Error("No provider found");
  }
  return ctx;
};

interface ZSvgContext {
  camera: Vector<Animated.SharedValue<number>>;
  canvas: Vector3;
}

interface ZSvgProps {
  canvas: Vector3;
  children: ReactElement[] | ReactElement;
}

const ZSvg = ({ canvas, children }: ZSvgProps) => {
  const camera = { x: useSharedValue(0), y: useSharedValue(0) };
  return (
    <Context.Provider value={{ canvas, camera }}>
      <View style={{ width: canvas.x, height: canvas.y }}>
        {Children.map(children, (child, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const zIndex = useSharedValue(index);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const style = useAnimatedStyle(() => ({
            zIndex: zIndex.value,
          }));
          return (
            <ZIndexContext.Provider value={zIndex}>
              <Animated.View
                key={index}
                style={[StyleSheet.absoluteFill, style]}
                pointerEvents="none"
              >
                <Svg
                  style={{
                    ...StyleSheet.absoluteFillObject,
                  }}
                  viewBox={[
                    -canvas.x / 2,
                    -canvas.y / 2,
                    canvas.x,
                    canvas.y,
                  ].join(" ")}
                >
                  {child}
                </Svg>
              </Animated.View>
            </ZIndexContext.Provider>
          );
        })}
        <Camera camera={camera} canvas={canvas} />
      </View>
    </Context.Provider>
  );
};

export default ZSvg;
