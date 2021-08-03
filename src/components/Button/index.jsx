import "./styles.css";

import { Component } from "react";

export class Button extends Component {
  render() {
    const { text, atrClick, disabled } = this.props;
    return (
      <button className="button" onClick={atrClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}
