module.exports = {
  extends: ["plugin:flowtype/recommended", "airbnb"],
  plugins: ["flowtype", "react-native"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    "react": {
      "version": "16.3"
    }
  },
  env: {
    jest: true
  },
  rules: {
    "quotes": ["error", "double"],
    "no-console": 2,
    "no-use-before-define": 0,
    "jsx-a11y/accessible-emoji": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "max-len": ["error", { code: 120 }],
    "flowtype/delimiter-dangle": [2, "always-multiline"],
    "flowtype/semi": [2, "always"],
    "flowtype/array-style-simple-type": [2, "shorthand"],
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/require-valid-file-annotation": [
        2,
        "always",
        {
          "annotationStyle": "line"
        }
    ],
    "react/sort-comp": 0,
    "react/no-did-mount-set-state": 0,
    "react/prop-types": 0,
    "react/no-did-update-set-state": 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
  },
  globals: {
    fetch: false,
    btoa: false,
    Headers: false,
    window: false,
    navigator: false,
    requestAnimationFrame: true,
    cancelAnimationFrame: true
  }
};
