// import { addQuestion } from './questions';
import { addQuestion } from './actions';

class SocketHandler {
  constructor(server, store) {
    this.store = store;
    this.socket = new WebSocket(server);
    this.handleOpen = this.handleOpen.bind(this);
    this.socket.onopen = this.handleOpen;
    this.handleRecieve = this.handleRecieve.bind(this);
    this.socket.onmessage = this.handleRecieve;
  }

  handleRecieve(event) {
    this.store.dispatch(addQuestion(JSON.parse(event.data)));
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(event.getElementById('post'));
    // console.log(event.target.value);
    // console.log(event.target[0].value);
    if (event.target[0].value && event.target[0].value !== '') this.socket.send(event.target[0].value);
  }

  handleOpen(event) {
    // this.store.dispatch(addQuestion({
    //   id: 0,
    //   user: 'SocketHandler',
    //   body: `Connected to ws://${window.location.host}`,
    // }));
  }
}

export default SocketHandler;
