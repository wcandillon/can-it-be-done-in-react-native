import React, { Children, ReactNode } from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Symbol, Use } from "react-native-svg";

import { Vector3 } from "./Vector";

const AnimatedUse = Animated.createAnimatedComponent(Use);

interface ZSvgProps {
  canvas: Vector3;
  children: ReactNode;
}

const ZSvg = ({ canvas, children }: ZSvgProps) => {
  return (
    <Svg
      width={canvas.x}
      height={canvas.y}
      viewBox={[-canvas.x / 2, -canvas.y / 2, canvas.x, canvas.y].join(" ")}
    >
      {Children.map(children, (child, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const useProps = useAnimatedProps(() => ({
          href: `#${index === 0 ? 1 : 0}`,
        }));
        return (
          <React.Fragment key={index}>
            <Symbol id={`${index}`}>{child}</Symbol>
            <AnimatedUse animatedProps={useProps} />
          </React.Fragment>
        );
      })}
    </Svg>
  );
};

export default ZSvg;
