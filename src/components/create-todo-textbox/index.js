import React from "react";

import CreateTodoTextbox from "./presentational.js";

class CreateTodoTextboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: ""
    };
  }

  render() {
    return <CreateTodoTextbox {...this.props} {...this.state} />;
  }
}

export default CreateTodoTextboxContainer;
