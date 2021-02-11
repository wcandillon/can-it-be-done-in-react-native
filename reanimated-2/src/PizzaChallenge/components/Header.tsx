import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const HEADER_HEIGHT = 150;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    height: HEADER_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  selected: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  size: {
    margin: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontFamily: "Antpolt",
    color: "#814035",
  },
  label: {
    fontFamily: "SFProDisplay-Medium",
  },
  labelSelected: {
    fontFamily: "SFProDisplay-Bold",
  },
});

interface SizeProps {
  label: string;
  selected?: boolean;
}

const Size = ({ label, selected }: SizeProps) => {
  return (
    <View style={[styles.size, selected ? styles.selected : undefined]}>
      <Text style={[styles.label, selected ? styles.labelSelected : undefined]}>
        {label}
      </Text>
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>17 $</Text>
      <View style={styles.sizes}>
        <Size label="S" />
        <Size label="M" selected />
        <Size label="L" />
      </View>
    </View>
  );
};

export default Header;
