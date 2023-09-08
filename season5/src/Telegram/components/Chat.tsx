import React from "react";

import { Box, Text } from "../../components";

import type chats from "./data/chats.json";
import { Avatar } from "./Avatar";
import { Checkmark } from "./Checkmark";

interface ChatProps {
  chat: (typeof chats)[0];
}

export const Chat = ({ chat }: ChatProps) => {
  return (
    <Box padding="m" flexDirection="row" alignItems="center">
      <Avatar id={chat.user} large />
      <Box flex={1} paddingHorizontal="m">
        <Text>Martin Randolph</Text>
        <Text>You: What’s man! · 9:40 AM</Text>
      </Box>
      <Checkmark checked={chat.read} />
    </Box>
  );
};
