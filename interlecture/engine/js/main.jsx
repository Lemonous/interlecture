import React from 'react';
import { render } from 'react-dom';
import Chat from 'js-common/chat';
import Classroom from 'js-common/classroom';

const questions = [
  {
    id: 1,
    user: 'Rolf',
    body: 'hvorfor gjør vi dette?',
  },
  {
    id: 2,
    user: 'Arne',
    body: 'kommer dette på eksamen?',
  },
  {
    id: 3,
    user: 'Kåre',
    body: 'hva er meningen med livet?',
  },
  {
    id: 4,
    user: 'Bjarne',
    body: 'finnes egentlig julenissen?',
  },
];

const Main = () => (
  <div style={{ margin: '5pt 5%' }}>
    <a href="/logout/">Logout</a>
    <Chat server={`ws://${window.location.host}`} />
    <Classroom questions={questions} />
  </div>
);

render(<Main />, document.getElementById('main'));
