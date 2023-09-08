import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";

import type { Routes } from "./src/Routes";
import { Examples } from "./src/Examples";
import { Headspace } from "./src/Headspace";
import { Riveo } from "./src/Riveo";
import { SongOfBloom } from "./src/SongOfBloom";
import {
  ColorSchemeProvider,
  LoadAssets,
  darkTheme,
  theme,
  useColorScheme,
} from "./src/components";
import { Instagram, StickerModal } from "./src/Instagram";
import { StickerProvider } from "./src/Instagram/StickerContext";
import { Telegram } from "./src/Telegram";

const fonts = {};
const assets: number[] = [];
const Stack = createStackNavigator<Routes>();
const AppNavigator = () => {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : theme}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Examples"
            component={Examples}
            options={{
              title: "Can it be done in React Native?",
            }}
          />
          <Stack.Screen
            name="Headspace"
            component={Headspace}
            options={{
              title: "🟠 Headspace",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Riveo"
            component={Riveo}
            options={{
              title: "📼 Riveo",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SongOfBloom"
            component={SongOfBloom}
            options={{
              title: "*️⃣ Song of Bloom",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Instagram"
            component={Instagram}
            options={{
              title: "📸 Instagram",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Telegram"
            component={Telegram}
            options={{
              title: "💬 Telegram",
              headerShown: false,
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="StickerModal"
            component={StickerModal}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </ThemeProvider>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    SFProDisplayBold: require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    SFProTextRegular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ColorSchemeProvider>
      <LoadAssets assets={assets} fonts={fonts}>
        <StickerProvider>
          <AppNavigator />
        </StickerProvider>
      </LoadAssets>
    </ColorSchemeProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
