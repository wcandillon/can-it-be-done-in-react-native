import React from "react";

import Gallery, { Image } from "./components/Gallery";

const images: Image[] = [
  {
    // eslint-disable-next-line max-len
    uri: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 576,
  },
  {
    // eslint-disable-next-line max-len
    uri: "https://images.unsplash.com/photo-1520351882386-12955ab00908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 1000,
  },
  {
    // eslint-disable-next-line max-len
    uri: "https://images.unsplash.com/photo-1544392827-1fc9d8111cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80",
    width: 800,
    height: 1000,
  },
];

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    return (
      <Gallery {...{ images }} />
    );
  }
}
