import React from "react";
import { render } from "react-dom";
import Chat from './chat.jsx';

function clickButton() {
  console.log("button clicked");
}

const Main = () => (
  <div style={{margin: '5pt 5%'}}>
    <Chat server={"ws://" + window.location.host}/>
  </div>
);

render(<Main/>, document.getElementById('main'))
