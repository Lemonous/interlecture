import React from "react"
import { render } from "react-dom"

class App1 extends React.Component {
  render() {
    return (
      <h1>HELLO</h1>
    )
  }
}

render(<App1/>, document.getElementById('main'))
