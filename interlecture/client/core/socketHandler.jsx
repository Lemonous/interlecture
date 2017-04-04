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
    this.submitLike = this.submitLike.bind(this);
    this.goToCourse = this.goToCourse.bind(this);
  }

  handleRecieve(event) {
    this.store.dispatch(serverAction(JSON.parse(event.data)));
  }

  submitReply({ value, postId }) {
    this.socket.send(JSON.stringify(
          { app: 'questions', command: 'post', room: 'test', text: value, parent_post: postId }));
  }

  submitLike(event, postId) {
    event.preventDefault();
    this.socket.send(JSON.stringify(
          { app: 'questions', command: 'support', post: postId }));
  }

  submitQuestion({ value }) {
    if (value && value !== '') {
      this.socket.send(JSON.stringify(
            { app: 'questions', command: 'post', room: 'test', text: value }));
    }
  }

  goToCourse({ value }) {
    if (value && value !== '') {
      this.socket.send(JSON.stringify(
            { app: 'courses', command: 'goToCourse', text: value }));
    }
  }

  handleOpen(event) {
    this.socket.send(JSON.stringify(
        { app: 'questions', command: 'subscribe', room: 'test' }));
  }
}

export default SocketHandler;
