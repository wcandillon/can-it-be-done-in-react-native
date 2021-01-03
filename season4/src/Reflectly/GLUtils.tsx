import { RefObject, useEffect, useRef } from "react";
import Color from "color";
import { Node } from "gl-react";

export const color2vector = (color: string): [number, number, number] => {
  const co = Color(color);
  return [co.red() / 255, co.green() / 255, co.blue() / 255];
};

export const useGLProgress = (
  node: RefObject<Node>,
  uniforms: Record<string, unknown>,
  deps: unknown[]
) => {
  const progress = useRef(0);
  const animate = () => {
    if (progress.current < 1) {
      progress.current += 0.05;
      ((node.current as unknown) as
        | { setDrawProps: (props: Record<string, unknown>) => void }
        | undefined)?.setDrawProps({
        uniforms: {
          ...uniforms,
          progress: progress.current,
        },
      });
      requestAnimationFrame(animate);
    }
  };
  useEffect(() => {
    progress.current = 0;
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
