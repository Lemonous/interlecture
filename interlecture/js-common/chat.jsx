import React from 'react';
import { Panel, Form, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: '', text: [] };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = new WebSocket(this.props.server);
    this.handleOpen = this.handleOpen.bind(this);
    this.socket.onopen = this.handleOpen;
    this.handleRecieve = this.handleRecieve.bind(this);
    this.socket.onmessage = this.handleRecieve;
    console.log(this.socket);
  }


  handleRecieve(event) {
    this.outputString(event.data);
  }

  handleOpen(event) {
    this.outputString(`Connected to ${this.props.server}`);
  }

  handleInput(event) {
    this.setState({ msg: event.target.value, text: this.state.text });
  }

  outputString(s) {
    this.setState({ msg: '', text: this.state.text.concat(<p key={this.state.text.length}> {s} </p>) });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.msg != '') this.socket.send(this.state.msg);
  }

  render() {
    return (
      <div>
        <Panel>
          {this.state.text}
        </Panel>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <FormControl
              type="text" onChange={this.handleInput}
              value={this.state.msg} placeholder="Enter message"
            />
            <InputGroup.Button> <Button onClick={this.handleSubmit}>
            Send
          </Button> </InputGroup.Button>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default Chat;
