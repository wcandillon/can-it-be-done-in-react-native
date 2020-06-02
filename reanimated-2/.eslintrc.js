module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "react-native/no-inline-styles": 0,
  },
};
