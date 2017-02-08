import React from "react";
import { render } from "react-dom";
import Test from './test.jsx';

function clickButton() {
  console.log("button clicked");
}

class App1 extends React.Component {
  render() {
    return (
      <Test color='#459CD4' size='40px' text='Hello!' clickButton={clickButton}/>
    )
  }
}

render(<App1/>, document.getElementById('main'))
