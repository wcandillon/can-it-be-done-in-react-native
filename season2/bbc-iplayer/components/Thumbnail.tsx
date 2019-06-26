import * as React from "react";
import { View, Text } from "react-native";

interface ThumbnailProps {
  name: string;
}

export default ({ name }: ThumbnailProps) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 16,
        backgroundColor: "#3498db",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: 72, color: "white", textAlign: "center" }}>
        {name}
      </Text>
    </View>
  );
};
