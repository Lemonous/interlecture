import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Classroom from '../questions/classroom';
import SocketHandler from './socketHandler';
import questions from './reducers';

const store = createStore(questions);
const sock = new SocketHandler(`ws://${window.location.host}`, store);

const classroom = {
  id: 0,
  title: 'test',
  lecturer: 'gruppe69',
};

const Main = () => (
  <Provider store={store}>
    <div style={{ margin: '5pt 5%' }}>
      <a href="/logout/">Logout</a>
      <Classroom
        classroom={classroom}
        submitQuestion={sock.submitQuestion}
        submitReply={sock.submitReply}
      />

    </div>
  </Provider>
);
render(<Main />, document.getElementById('main'));
