import React from 'react';
import renderer from 'react-test-renderer';
import { Classroom } from '../questions/classroom.jsx';

const questions = [
  {
    id: 1,
    user: 'Rolf',
    body: 'hvorfor gjør vi dette?',
    datetime: 'whatever',
  },
  {
    id: 2,
    user: 'Arne',
    body: 'kommer dette på eksamen?',
    datetime: 'whatever',
  },
  {
    id: 3,
    user: 'Kåre',
    body: 'hva er meningen med livet?',
    datetime: 'whatever',
  },
  {
    id: 4,
    user: 'Bjarne',
    body: 'finnes egentlig julenissen?',
    datetime: 'whatever',
  },
  {
    id: 5,
    user: 'Rolf',
    body: 'jeg skjønner ikke håndskriften din :(',
    datetime: 'whatever',
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
    <Classroom
      classroom={classroom}
      submitQuestion={onSubmit}
      submitReply={onSubmit}
      submitLike={onSubmit}
      questions={questions}
    />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
