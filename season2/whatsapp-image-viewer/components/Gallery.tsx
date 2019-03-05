import * as React from "react";
import ImageViewer from "./ImageViewer";

export interface Image {
  uri: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: Image[]
}

export default class Gallery extends React.PureComponent<GalleryProps> {
  render() {
    const { images: [source] } = this.props;
    return (
      <ImageViewer {...{ source }} />
    );
  }
}
