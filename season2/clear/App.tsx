import * as React from "react";

import List from "./components/List";

const tasks = [
  "Swipe to the right to complete!",
  "Swipe to the left to delete",
  "Tap and hold to pick me up",
  "Pull down to create an item",
  "Try shaking to undo",
  "Try pincing vertically shut",
  "Pull up to clear",
];

const App = () => <List {...{ tasks }} />;
export default App;
