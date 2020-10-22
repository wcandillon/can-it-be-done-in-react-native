import React, { Children, ReactNode, useContext } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import Svg, { Symbol, Use } from "react-native-svg";

import Camera from "./Camera";
import { Vector3 } from "./Vector";

const AnimatedUse = Animated.createAnimatedComponent(Use);
const Context = React.createContext<ZSvgContext | null>(null);

const useCamera = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  return { x, y };
};

export const useZSvg = () => {
  const ctx = useContext(Context);
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
  children: ReactNode;
}

const ZSvg = ({ canvas, children }: ZSvgProps) => {
  const camera = useCamera();
  return (
    <Context.Provider value={{ canvas, camera }}>
      <View>
        <Svg
          width={canvas.x}
          height={canvas.y}
          viewBox={[-canvas.x / 2, -canvas.y / 2, canvas.x, canvas.y].join(" ")}
        >
          {Children.map(children, (child, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const useProps = useAnimatedProps(() => ({
              href: `#${index}`,
            }));
            return (
              <React.Fragment key={index}>
                <Symbol id={`${index}`}>{child}</Symbol>
                <AnimatedUse animatedProps={useProps} />
              </React.Fragment>
            );
          })}
        </Svg>
        <Camera camera={camera} canvas={canvas} />
      </View>
    </Context.Provider>
  );
};

export default ZSvg;
