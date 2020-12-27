/* eslint-disable max-len */
import * as React from "react";
import Animated, {
  processColor,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const LOGO_WIDTH = 187.09;
export const LOGO_HEIGHT = 82.68;

interface LogoProps {
  color: Animated.SharedValue<string>;
}

const Logo = ({ color }: LogoProps) => {
  const p1 = useAnimatedProps(() => ({ fill: processColor(color.value) }));
  const p2 = useAnimatedProps(() => ({ fill: processColor(color.value) }));
  return (
    <Svg width={LOGO_WIDTH} height={LOGO_HEIGHT} viewBox="0 0 187.09 82.68">
      <AnimatedPath
        animatedProps={p1}
        d="M128.81 10.16H147S169 9 168.45 20.32c-.87 17.47-27.65 16.22-27.65 16.22l5.2-22.71h-18.2l-7.6 32.87h18.06s18 .8 32.88-6.35c15.8-7.62 15.94-21 15.94-21a15.3 15.3 0 00-7.76-13.4C170 .42 157.87 0 157.87 0h-39.78L94.53 30.62 84.65 0H16.08l-2.54 10.16h18.2S53.75 9 53.19 20.32c-.87 17.47-27.65 16.22-27.65 16.22l5.22-22.71h-18.2L4.94 46.7H23s18 .8 32.87-6.35c15.8-7.62 15.94-21 15.94-21a35 35 0 00-.7-5.5c-.43-1.41-1-3.67-1-3.67H71l16.76 47.1 41.05-47.12zM88.32 57.28C39.54 57.28 0 63 0 70s39.54 12.7 88.32 12.7S176.64 77 176.64 70 137.1 57.28 88.32 57.28zM45.54 76.92h-3.72l-7.76-13.19h5.21l4.46 8 4.48-8h5.22zm20.93 0h-4.8V63.73h4.8zm17 0h-6.8V63.73h6.8c5.15 0 9.38 2.89 9.38 6.59s-4.27 6.6-9.39 6.6zm29.16-10.28h-5.7v2.2h5.41v2.9h-5.41V74h5.7v2.9h-10.5V63.73h10.5zm19.29 10.72c-5.93 0-10.21-3-10.21-7.28 0-4 4.89-6.78 10.21-6.78s10.21 2.79 10.21 6.78c-.01 4.27-4.3 7.28-10.22 7.28z"
      />
      <AnimatedPath
        animatedProps={p2}
        d="M131.91 66.62c2.86 0 5.21 1.66 5.21 3.48 0 2.27-2.35 3.93-5.21 3.93s-5.22-1.66-5.22-3.93c0-1.82 2.35-3.48 5.22-3.48zM82.58 66.64h-1.13V74h1.08c2.87 0 5.32-1.12 5.32-3.69 0-2.31-2.18-3.67-5.27-3.67z"
      />
    </Svg>
  );
};

export default Logo;
