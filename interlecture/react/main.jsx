import React from 'react';
import { render } from 'react-dom';
import Chat from './chat.jsx';
import Test from './test';

function clickButton() {
  console.log('button clicked');
}

const Main = () => (
  <div style={{ margin: '5pt 5%' }}>
    <Test color="#459CD4" size="40px" text="Hello!" clickButton={clickButton} />
    <Chat server={`ws://${window.location.host}`} />
  </div>
);

render(<Main />, document.getElementById('main'));
