// import React, { Component } from "react";
import styled from "styled-components";

// class TodoAppInput extends Component {
//   render() {
//     return <input {...this.props} />;
//   }
// }

export const Input = styled.input`
  /* .todoapp input::-webkit-input-placeholder */
  ::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  /* .todoapp input::-moz-placeholder */
  ::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  /* .todoapp input::input-placeholder */
  ::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;

const Textbox = styled(Input)`
  /* .new-todo,.edit */
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
export default Textbox;
