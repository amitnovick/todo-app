import React, { Component } from "react";
import styled from "styled-components";

class Input extends Component {
  render() {
    return <StyledInput />;
  }
}

const StyledInput = styled.input`
  ::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  ::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  ::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;

export default Input;
