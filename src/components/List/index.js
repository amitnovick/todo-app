import React, { Component } from "react";
import ListItem from "../ListItem/index.js";
import Section from "./Section.js";
import Ul from "./Ul.js";

const styles = {
  li: {
    isLastChild: {
      borderBottom: "none"
    },
    isLastChild_isBeingEdited: {
      marginBottom: "-1px"
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditItemID: null
    };

    this.deactivateTitleEditMode = this.deactivateTitleEditMode.bind(this);
  }

  replaceTitle(todoToSave, text) {
    this.props.replaceTitle(todoToSave, text);
    this.deactivateTitleEditMode();
  }

  activateTitleEditMode(todo) {
    this.setState({
      titleEditItemID: todo.id
    });
  }

  deactivateTitleEditMode() {
    this.setState({
      titleEditItemID: null
    });
  }

  handleDestroyClick(itemID) {
    this.props.onDestroy(itemID);
  }

  /* Utility method */
  isLastChild(i, arr) {
    return i === arr.length - 1;
  }

  render() {
    const { todos, loadingItemIDs, onToggle } = this.props;
    const { titleEditItemID } = this.state;
    return (
      <Section className="main">
        <Ul className="todo-list">
          {todos.map((todo, i, arr) => (
            <ListItem
              key={todo.id}
              todo={todo}
              isBeingEdited={titleEditItemID === todo.id}
              replaceTitle={title => this.replaceTitle(todo, title)}
              onTitleClick={() => this.activateTitleEditMode(todo)}
              onDestroyClick={() => this.handleDestroyClick(todo.id)}
              onCancelTitleEdit={() => this.deactivateTitleEditMode()}
              isLoading={loadingItemIDs.includes(todo.id)}
              onToggle={() => onToggle(todo)}
              style={Object.assign(
                {},
                titleEditItemID === todo.id &&
                  this.isLastChild(i, arr) &&
                  styles.li.isLastChild_isBeingEdited,
                this.isLastChild(i, arr) && styles.li.isLastChild
              )}
            />
          ))}
        </Ul>
      </Section>
    );
  }
}

export default App;

// const StyledUnorderedList = styled.ul`
//   .todo_list {
//     margin: 0;
//     padding: 0;
//     list-style: none;
//   }
// `;

// const StyledSection = styled.section`
//   .main {
//     position: relative;
//     z-index: 2;
//     border-top: 1px solid #e6e6e6;
//   }
// `;
