import React from "react";
import { render } from "react-dom";
import Test from './test.jsx';

class App1 extends React.Component {
  render() {
    return (
      <Test color='#459CD4' size='40px' text='Hello!'/>
    )
  }
}

render(<App1/>, document.getElementById('main'))
