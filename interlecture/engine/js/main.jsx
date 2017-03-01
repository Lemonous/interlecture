//  foreløpog skille mellom filer og
import React from 'react';
import { render } from 'react-dom';
import Chat from 'js-common/chat';
<<<<<<< HEAD
import Test from 'js-common/test';
import QuestionItem from 'js-common/questionItem';

//  importerer saker utover standard html
// bruker kun inline css i react. ≈CSS. Camelcase
function clickButton() {
  console.log('button clicked');
  //  kalles fra test.
}
/*  function cB2() {
  console.log('nB clicked');
  //  kalles fra test.
}
*/
//  arrow funksjon
//  <QuestionItem color="#e7e7e7" size="40px" clickButton={clickButton}
/* color, size ,... er props. her definerer vi innhold i props.*/
const Main = () => (
  <div style={{ margin: '5pt 5%' }}>
    <a href="/logout/">Logout</a>
    <Test color="#459CD4" size="40px" text="Hello!" clickButton={clickButton} />
    <QuestionItem color="#e7e7e7" size="40px" clickButton={clickButton} />
=======
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
>>>>>>> 8f40513c6d2a8a9f8273b88aeb602ae0ba169a4f
    <Chat server={`ws://${window.location.host}`} />
    <Classroom questions={questions} />
  </div>
);
render(<Main />, document.getElementById('main'));
