import React from 'react';
import { render } from 'react-dom';
import Chat from 'js-common/chat';
import Test from 'js-common/test';

function clickButton() {
  console.log('button clicked');
}

const Main = () => (
  <div style={{ margin: '5pt 5%' }}>
    <a href="/logout/">Logout</a>
    <Test color="#459CD4" size="40px" text="Hello!" clickButton={clickButton} />
    <Chat server={`ws://${window.location.host}`} />
  </div>
);

render(<Main />, document.getElementById('main'));

