import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SocketHandler from './socketHandler';
import Classroom from '../questions/classroom';
import ChooseCourse from '../courses/chooseCourse';
import CreateCourse from '../courses/createCourse';
import posts from './reducers';

const store = createStore(posts);
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
      <ChooseCourse/>
      <Classroom
        classroom={classroom}
        posts={posts}
        submitQuestion={sock.submitQuestion}
        submitReply={sock.submitReply}
        submitLike={sock.submitLike}
        submitDelete={sock.submitDelete}
      />
    </div>
  </Provider>
);

render(<Main/>, document.getElementById('main'));
