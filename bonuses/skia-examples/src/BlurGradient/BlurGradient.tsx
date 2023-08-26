import {
  Canvas,
  useImage,
  ImageShader,
  Fill,
  Shader,
  LinearGradient,
  vec,
  Image,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { frag } from "../components/ShaderLib";

/*
Sigma 2.0

const float OFFSETS[11] = float[11](
    -9.088716844628308,
    -7.137270774529544,
    -5.206290077682596,
    -3.2979348079914823,
    -1.4091998770852123,
    0.46943377969837197,
    2.351564403533789,
    4.2493201357512165,
    6.168999895680605,
    8.110691649776209,
    10
);

const float WEIGHTS[11] = float[11](
    0.000010619486407303852,
    0.0005663909190720241,
    0.011647349148054967,
    0.09342542255179472,
    0.29564393216745055,
    0.3720790429179818,
    0.18656819792621224,
    0.03707930191699844,
    0.0028913745594730898,
    0.00008742627922919132,
    9.421273256292181e-7
);

Sigma 40

const float OFFSETS[11] = float[11](
    -9.498515812174322,
    -7.498828249433795,
    -5.49914062651167,
    -3.4994529131491405,
    -1.4997650690963908,
    0.4999212888807894,
    2.499609010435134,
    4.499296783387966,
    6.498984447180354,
    8.498672036763061,
    10
);

const float WEIGHTS[11] = float[11](
    0.09364486298405995,
    0.09464486934933067,
    0.09541681985119257,
    0.09595504344143957,
    0.09625561321963186,
    0.09631600233669779,
    0.09613521065488503,
    0.09571543458909648,
    0.09505974609418924,
    0.09417295255302499,
    0.046683444926451816
);
*/

// https://www.shadertoy.com/view/4tSyzy
// TODO: clean shader
const { width, height } = Dimensions.get("window");
const source = frag`
uniform shader iImage1;
uniform shader mask;
uniform float2 iResolution;
uniform float2 direction;
uniform float START_OFFSETS[21];
uniform float START_WEIGHTS[21];
uniform float END_OFFSETS[21];
uniform float END_WEIGHTS[21];

const int SAMPLE_COUNT = 21;

vec4 blur(vec2 blurDirection, vec2 pixelCoord, float alpha)
{
  vec4 result = vec4(0.0);
  vec2 size = iResolution;
  for (int i = 0; i < SAMPLE_COUNT; ++i)
  {
    vec2 offset = blurDirection * mix(START_OFFSETS[i], END_OFFSETS[i], alpha);
    float weight = mix(START_WEIGHTS[i], END_WEIGHTS[i], alpha);
    result += iImage1.eval(pixelCoord + offset) * weight;
  }
  return result;
}

vec4 main(vec2 xy) {
  return blur(direction, xy, mask.eval(xy).a);
}
`;

const START_OFFSETS = [
  -20, -18, -16, -14, -12, -10, -8, -6, -4, -1, 2.8710509569287896e-7, 2, 4, 6,
  8, 10, 12, 14, 16, 18, 20,
];

const START_WEIGHTS = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 2.8710501326356663e-7, 0.9999997128949867, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
];

const END_OFFSETS = [
  -19.498050125411424, -17.498250135103707, -15.498450140782271,
  -13.49865013827732, -11.49885012206194, -9.499050084932998, -7.49925001762797,
  -5.499449908365257, -3.4996497422942254, -1.4998495008374828,
  0.4999494988878319, 2.4997496323162376, 4.499549833496033, 6.4993499690904315,
  8.49915005572385, 10.498950106637306, 12.498750132290162, 14.498550140862875,
  16.49835013867685, 18.498150130544115, 20,
];

const END_WEIGHTS = [
  0.04647569812103258, 0.047168537859037546, 0.04779517635350229,
  0.048352719797183835, 0.048838573634454735, 0.049250463372889436,
  0.04958645318202337, 0.04984496209591852, 0.050024777662706285,
  0.05012506691329072, 0.05014521925315826, 0.05008490007126294,
  0.04994476761213943, 0.04972547730806588, 0.04942805306889317,
  0.04905389314480593, 0.048604757803112394, 0.04808275438433582,
  0.04749031988024453, 0.046830201204178426, 0.02314722727776385,
];

export const BlurGradient = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const image = useImage(require("./zurich.jpg"));
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = -y;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <Fill>
          <Shader
            source={source}
            uniforms={{
              iResolution: [width, height],
              START_OFFSETS,
              START_WEIGHTS,
              END_OFFSETS,
              END_WEIGHTS,
              direction: [0, 1],
            }}
          >
            <Shader
              source={source}
              uniforms={{
                iResolution: [width, height],
                START_OFFSETS,
                START_WEIGHTS,
                END_OFFSETS,
                END_WEIGHTS,
                direction: [1, 0],
              }}
            >
              <ImageShader
                image={image}
                x={0}
                y={scrollY}
                width={width}
                height={height}
                fit="cover"
              />
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, height)}
                colors={["transparent", "transparent", "black"]}
              />
            </Shader>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, height)}
              colors={["transparent", "transparent", "black"]}
            />
          </Shader>
        </Fill>
      </Canvas>
      <View style={StyleSheet.absoluteFill}>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={onScroll} />
      </View>
    </View>
  );
};
