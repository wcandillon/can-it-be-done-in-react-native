import type { ExpoWebGLRenderingContext } from "expo-gl";
import { GLView } from "expo-gl";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  useAnimatedReaction,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const onContextCreate = (gl: ExpoWebGLRenderingContext) => {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Create vertex shader (shape & position)
  const vert = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(
    vert,
    `
attribute vec4 aPosition;               
varying vec2 uv;
void main()
{
    gl_Position = aPosition;
    uv = vec2((aPosition.x + 1.0) / 2.0, (aPosition.y + 1.0) / 2.0) ;
}
  `
  );
  gl.compileShader(vert);

  // Create fragment shader (color)
  const frag = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(
    frag,
    `
precision mediump float;
varying vec2 uv;
uniform float blue;

void main()
{
    gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}
  `
  );
  gl.compileShader(frag);

  // Link together into a program
  const program = gl.createProgram()!;

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);

  // Load the data into the GPU
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  const blue = gl.getUniformLocation(program, "blue");
  gl.uniform1f(blue, 0);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

  gl.flush();
  gl.endFrameEXP();
};

const updateUniform = (progress: number, contextId: number) => {
  "worklet";
  const gl = GLView.getWorkletContext(contextId);
  if (gl) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f({ id: 0 }, progress);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.flush();
    gl.endFrameEXP();
  }
};

export const WebGL = () => {
  const contextId = useSharedValue(0);
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [progress]);
  useAnimatedReaction(
    () => progress.value,
    (value) => {
      updateUniform(value, contextId.value);
    }
  );
  return (
    <GLView
      style={styles.container}
      onContextCreate={(gl) => {
        contextId.value = gl.contextId;
        onContextCreate(gl);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
