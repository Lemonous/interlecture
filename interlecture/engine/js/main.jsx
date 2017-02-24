import React from 'react';
import { render } from 'react-dom';
import Classroom from 'js-common/classroom';
import { Provider } from 'react-redux';
import SocketHandler from 'js-common/socketHandler';
import { createStore } from 'redux';
import questions from 'js-common/reducers';
import { classroom } from './fixtures';

const store = createStore(questions);
const sock = new SocketHandler(`ws://${window.location.host}`, store);

const Main = () => (
  <Provider store={store}>
    <div style={{ margin: '5pt 5%' }}>
      <a href="/logout/">Logout</a>
      <Classroom classroom={classroom} />
    </div>
  </Provider>
);

render(<Main />, document.getElementById('main'));
