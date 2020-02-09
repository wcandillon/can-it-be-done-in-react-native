import createSharedTransitionNavigator from "./createSharedTransitionNavigator";

import Home from "./Home";
import Note from "./Note";

export default createSharedTransitionNavigator({
  Home: {
    screen: Home
  },
  Note: {
    screen: Note
  }
});
