import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from '../pages';

class App extends React.Component {
  render() {
    return (
      <Dashboard />
    )
  }
}

const appDom = document.getElementById('app');

ReactDOM.render(<App/>, appDom);
