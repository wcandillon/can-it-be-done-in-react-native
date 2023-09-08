import {
  makeImageFromView,
  Image,
  Canvas,
  mix,
  vec,
  ImageShader,
  Circle,
  dist,
} from "@shopify/react-native-skia";
import type { Vector, SkImage } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import type { ReactNode, RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
import { Appearance, Dimensions, View, StyleSheet } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export type ColorSchemeName = "light" | "dark";

interface ColorScheme {
  colorScheme: ColorSchemeName;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
}

interface ColorSchemeContext extends ColorScheme {
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{ x: number; y: number; r: number }>;
  dispatch: (scheme: ColorScheme) => void;
}

const defaultValue: ColorScheme = {
  colorScheme: Appearance.getColorScheme() ?? "light",
  overlay1: null,
  overlay2: null,
};

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null);

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error("No ColorScheme context context found");
  }
  const { colorScheme, dispatch, ref, transition, circle } = ctx;
  const toggle = useCallback(
    async (x: number, y: number) => {
      // 0. Define the circle and its maximum radius
      const r = Math.max(...corners.map((corner) => dist(corner, { x, y })));
      circle.value = { x, y, r };

      const newColorScheme = colorScheme === "light" ? "dark" : "light";
      // 1. Take the screenshot
      const overlay1 = await makeImageFromView(ref);
      // 2. display it
      dispatch({
        colorScheme,
        overlay1,
        overlay2: null,
      });
      // 3. switch to dark mode
      await wait(16);
      dispatch({
        colorScheme: newColorScheme,
        overlay1,
        overlay2: null,
      });
      // 4. wait for the dark mode to render
      await wait(16);
      // 5. take screenshot
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        colorScheme: newColorScheme,
        overlay1,
        overlay2,
      });
      // 6. transition
      transition.value = 0;
      transition.value = withTiming(1, { duration: 650 });
      await wait(650);
      dispatch({
        colorScheme: newColorScheme,
        overlay1: null,
        overlay2: null,
      });
    },
    [circle, colorScheme, dispatch, ref, transition]
  );
  return { colorScheme, toggle };
};

interface ColorSchemeProviderProps {
  children: ReactNode;
}

const { width, height } = Dimensions.get("window");
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const transition = useSharedValue(0);
  const ref = useRef(null);
  const [{ colorScheme, overlay1, overlay2 }, dispatch] = useReducer(
    colorSchemeReducer,
    defaultValue
  );
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <View ref={ref} style={{ flex: 1 }}>
        <ColorSchemeContext.Provider
          value={{
            colorScheme,
            overlay1,
            overlay2,
            dispatch,
            ref,
            transition,
            circle,
          }}
        >
          {children}
        </ColorSchemeContext.Provider>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image image={overlay1} x={0} y={0} width={width} height={height} />
        {overlay2 && (
          <Circle c={circle} r={r}>
            <ImageShader
              image={overlay2}
              x={0}
              y={0}
              width={width}
              height={height}
              fit="cover"
            />
          </Circle>
        )}
      </Canvas>
    </View>
  );
};
