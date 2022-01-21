import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import type { Routes } from "./src/Routes";
import { LoadAssets } from "./src/components/LoadAssets";
import { Examples } from "./src/Examples";
import { RotaryLogin } from "./src/RotaryLogin";
import { Tarot, assets as tarotAssets } from "./src/Tarot";
import { Pinch } from "./src/Pinch";
import {
  LayoutAnimations,
  assets as layoutAnimationsAssets,
} from "./src/LayoutAnimations";
import { WebGL } from "./src/WebGL";

const assets = [...tarotAssets, ...layoutAnimationsAssets];
const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
};

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Playground"
      component={Examples}
      options={{
        title: "Playground",
      }}
    />
    <Stack.Screen
      name="RotaryLogin"
      component={RotaryLogin}
      options={{
        title: "Rotary Login",
        header: () => null,
      }}
    />
    <Stack.Screen
      name="Tarot"
      component={Tarot}
      options={{
        title: "Tarot",
        header: () => null,
      }}
    />
    <Stack.Screen
      name="Pinch"
      component={Pinch}
      options={{
        title: "Pinch",
        header: () => null,
      }}
    />
    <Stack.Screen
      name="LayoutAnimations"
      component={LayoutAnimations}
      options={{
        title: "Layout Animations",
      }}
    />
    <Stack.Screen
      name="WebGL"
      component={WebGL}
      options={{
        title: "WebGL",
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <LoadAssets assets={assets} fonts={fonts}>
      <AppNavigator />
    </LoadAssets>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
