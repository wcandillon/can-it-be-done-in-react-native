module.exports = {
  root: true,
  extends: "react-native-wcandillon",
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
