import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { stories, Home } from "./Home";
import StoryComp from "./Story";
import type { InstagramRoutes } from "./Model";

export const assets = stories
  .map((story) => [story.avatar, story.source])
  .flat();

const Stack = createSharedElementStackNavigator<InstagramRoutes>();
export const Instagram = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      presentation: "transparentModal",
    }}
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="Story"
      component={StoryComp}
      sharedElements={(route) => {
        const { id } = route.params.story;
        return [id];
      }}
    />
  </Stack.Navigator>
);
