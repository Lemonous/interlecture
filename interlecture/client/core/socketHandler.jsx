import { serverAction } from './actions';

class SocketHandler {
  constructor(server, store) {
    this.store = store;
    this.socket = new WebSocket(server);
    this.handleOpen = this.handleOpen.bind(this);
    this.socket.onopen = this.handleOpen;
    this.handleRecieve = this.handleRecieve.bind(this);
    this.socket.onmessage = this.handleRecieve;
    this.submitQuestion = this.submitQuestion.bind(this);
    this.submitReply = this.submitReply.bind(this);
  }

  handleRecieve(event) {
    this.store.dispatch(serverAction(JSON.parse(event.data)));
  }

  submitReply({ value, questionId }) {
    console.log(value);
    console.log(questionId);
  }

  submitQuestion(event) {
    event.preventDefault();
    if (event.target[0].value && event.target[0].value !== '') {
      this.socket.send(JSON.stringify(
            { app: 'questions', command: 'post', room: 'test', text: event.target[0].value }));
    }
  }

  handleOpen(event) {
    this.socket.send(JSON.stringify(
        { app: 'questions', command: 'subscribe', room: 'test' }));
  }
}

export default SocketHandler;
