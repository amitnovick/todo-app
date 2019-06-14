import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { Message, Button } from 'semantic-ui-react';

import TodosContainerDemo from '..//containers/Todos/TodosContainerDemo';
import unauthenticatedRoutes from '../routes/unauthenticatedRoutes';

const TodosScreenDemoAdapter = () => (
  <React.Fragment>
    <Message info style={{ textAlign: 'center' }}>
      <span style={{ lineHeight: 1.75 }}>
        You are currently viewing the <b>demo</b> version. <br />
      </span>
      <Link to={unauthenticatedRoutes.SIGNIN}>
        <Button basic color="blue">
          <FontAwesomeIcon icon={faCloud} style={{ marginRight: 10 }} />
          {`Access the Cloud version`}
        </Button>
      </Link>
    </Message>
    <TodosContainerDemo />
  </React.Fragment>
);

export default TodosScreenDemoAdapter;
