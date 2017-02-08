import React from "react";
import { render } from "react-dom";
import Test from './test.jsx';

function clickButton() {
  console.log("button clicked");
}

const Main = () => (
  <Test color='#459CD4' size='40px' text='Hello!' clickButton={clickButton}/>
);

render(<Main/>, document.getElementById('main'))
