import React from 'react';
import { render } from 'react-dom';
import Chat from 'js-common/chat';
import Classroom from 'js-common/classroom';
import { classroom, questions } from './fixtures';

const Main = () => (
  <div style={{ margin: '5pt 5%' }}>
    <a href="/logout/">Logout</a>
    <Chat server={`ws://${window.location.host}`} />
    <Classroom classroom={classroom} questions={questions} />
  </div>
);

render(<Main />, document.getElementById('main'));
