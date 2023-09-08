import React from "react";
import { ScrollView } from "react-native";

import { Box } from "../components";

import { Chat, Header } from "./components";
import chats from "./components/data/chats.json";

export const Telegram = () => {
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Header />
      <ScrollView>
        {chats.map((chat, index) => (
          <Chat chat={chat} key={index} />
        ))}
      </ScrollView>
    </Box>
  );
};
