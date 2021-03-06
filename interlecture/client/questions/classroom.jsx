import React from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Form } from 'react-bootstrap';
import 'static/css/font-awesome.css';
import { connect } from 'react-redux';
import PostList from './postList';
import InputForm from './inputForm';

function mapStateToProps(state) {
  return {
    posts: state.posts.filter(v => v),
    replyTo: state.replyTo,
  };
}

export const Classroom = ({ classroom, submitQuestion, ...props }) => (
  <div>
    <div className="panel" style={{ margin: '300px 5% 80px 5%' }}>
      <PostList {...props} />
    </div>

    <div
      style={{
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        height: '50px',
        paddingTop: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 15px 1px #2C2D37',
      }}
    >
      <div
        style={{
          width: '85%',
          margin: '0 auto',
        }}
      >
        <InputForm
          onSubmit={submitQuestion}
          id={'submitQuestion'}
          placeholder={'Enter question'}
          submitButtonText={'Submit Question'}
        />
      </div>
    </div>
  </div>
);

Classroom.propTypes = {
  classroom: React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    lecturer: React.PropTypes.string,
  }).isRequired,
  submitQuestion: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Classroom);
