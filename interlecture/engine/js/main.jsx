//  foreløpog skille mellom filer og
import React from 'react';
import { render } from 'react-dom';
// import Chat from 'js-common/chat';
//  import Test from 'js-common/test';
// import QuestionItem from 'js-common/questionItem';
import Classroom from 'js-common/classroom';
import { Provider } from 'react-redux';
import SocketHandler from 'js-common/socketHandler';
import { createStore } from 'redux';
import questions from 'js-common/reducers';
import { classroom } from './fixtures';



//  importerer saker utover standard html
// bruker kun inline css i react. ≈CSS. Camelcase
/*  function cB2() {
  console.log('nB clicked');
  //  kalles fra test.
}
*/
//  arrow funksjon
//  <QuestionItem color="#e7e7e7" size="40px" clickButton={clickButton}
/* color, size ,... er props. her definerer vi innhold i props.*/

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
