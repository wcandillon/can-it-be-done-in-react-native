import * as React from "react";
import { Svg } from "expo";

const { Path } = Svg;

interface EyeProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Eye extends React.PureComponent<EyeProps> {
  render() {
    return (
      <Svg width={8} height={8} viewBox="0 0 8 8">
        <Path
          d="M3.791.4A3.587 3.587 0 0 0 .205 3.988a3.586 3.586 0 1 0 7.172 0A3.587 3.587 0 0 0 3.791.4z"
          fill="#000"
          fillRule="evenodd"
        />
      </Svg>
    );
  }
}
