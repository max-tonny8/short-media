import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './container/App';
import 'amfe-flexible';
import "./style/main.scss";
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
