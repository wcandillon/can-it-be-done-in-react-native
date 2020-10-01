import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Snapchat, { stories } from "./Snapchat";
import { Story } from "./StoryThumbnail";
import StoryComp from "./Story";

export const assets = stories
  .map((story) => [story.avatar, story.source])
  .flat();

type Routes = {
  Snapchat: undefined;
  Story: { story: Story };
};

const Stack = createSharedElementStackNavigator<Routes>();
const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Snapchat" component={Snapchat} />
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

export default Navigator;
