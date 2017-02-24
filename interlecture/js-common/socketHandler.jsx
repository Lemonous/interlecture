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

  handleOpen(event) {
    this.store.dispatch(addQuestion({
      id: 0,
      user: 'SocketHandler',
      body: `Connected to ws://${window.location.host}`,
    }));
  }
}

export default SocketHandler;
