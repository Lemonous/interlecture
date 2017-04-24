import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from 'header';
import SocketHandler from './socketHandler';
import Classroom from '../questions/classroom';
import ChooseCourse from '../courses/chooseCourse';
import CreateCourse from '../courses/createCourse';
import posts from './reducers';
import MainPanel from './mainPanel';

const store = createStore(posts);
const sock = new SocketHandler(`ws://${window.location.host}`, store);

const Main = () => (
  <Provider store={store}>
    <div>
      <Header user={window.django2react.username}
              firstname={window.django2react.firstname}
              lastname={window.django2react.lastname}
      />
      <Classroom
        classroom={window.django2react.classroom}
        posts={posts}
        submitQuestion={sock.submitQuestion}
        submitReply={sock.submitReply}
        submitLike={sock.submitLike}
        submitDelete={sock.submitDelete}
        store={store}
      />
    </div>
  </Provider>
);
render(<Main />, document.getElementById('main'));
