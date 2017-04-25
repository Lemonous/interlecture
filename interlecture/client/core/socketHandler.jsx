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
    this.submitDelete = this.submitDelete.bind(this);
    this.createCourse = this.createCourse.bind(this);
  }

  handleRecieve(event) {
    this.store.dispatch(serverAction(JSON.parse(event.data)));
  }

  submitReply({ value, postId }) {
    this.socket.send(JSON.stringify(
          { app: 'questions', command: 'post', room: window.django2react.classroom.name, text: value, parent_post: postId }));
  }

  submitLike(event, postId) {
    event.preventDefault();
    this.socket.send(JSON.stringify(
          { app: 'questions', command: 'support', post: postId }));
  }

  submitDelete(event, postId) {
    event.preventDefault();
    this.socket.send(JSON.stringify(
          { app: 'questions', command: 'delete', post: postId }));
  }

  submitQuestion({ value }) {
    if (value && value !== '') {
      this.socket.send(JSON.stringify(
            { app: 'questions', command: 'post', room: window.django2react.classroom.name, text: value }));
    }
  }

  createCourse({ value }) {
    if (value && value !== '') {
      this.socket.send(JSON.stringify(
            { app: 'courses', command: 'createCourse', courseCode: value }));
    }
  }

  handleOpen(event) {
    this.socket.send(JSON.stringify(
        { app: 'questions', command: 'subscribe', room: window.django2react.classroom.name }));
  }
}

export default SocketHandler;
