// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { Classroom } from '../questions/classroom.jsx';

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
  {
    id: 5,
    user: 'Rolf',
    body: 'jeg skjønner ikke håndskriften din :(',
  },
];

function onSubmit(event) {
  event.preventdefault();
  console.log('onSubmit');
}

const classroom = {
  id: 0,
  title: 'test',
  lecturer: 'gruppe69',
};

test('Classroom looks like it should', () => {
  const component = renderer.create(
    <Classroom classroom={classroom} onSubmit={onSubmit} questions={questions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
