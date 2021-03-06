import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import ScreenRouter from './ScreenRouter';
import './style/global.css';
import 'semantic-ui-css/semantic.min.css';
import AuthenticationContainer from './containers/Auth/AuthContainer';

ReactDOM.render(
  <AuthenticationContainer>
    <ScreenRouter />
  </AuthenticationContainer>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
