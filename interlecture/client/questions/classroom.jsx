import React from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Form } from 'react-bootstrap';
import 'static/css/font-awesome.css';
import { connect } from 'react-redux';
import QuestionItem from './questionItem';
import PostList from './postList';

function mapStateToProps(state) {
  return {
    questions: state.filter(v=>v),
  };
}

export const Classroom = ({ questions, classroom, submitQuestion, submitReply, submitLike }) => (
  <div style={{ marginTop: '50px', marginBottom: '40px' }}>
    <h2>{classroom.title}</h2>
    <Grid>
      <Row>
        <Col sm={4} />
        <Col sm={4} />
        <Col sm={4}>
          <p><b>lecturer: {classroom.lecturer}</b></p>
        </Col>
      </Row>
    </Grid>
    <PostList posts={questions} submitReply={submitReply} submitLike={submitLike} />
    <div
      style={{
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        height: '50px',
        paddingTop: '10px',
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          width: '85%',
          marginLeft: '30px',
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
  questions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  classroom: React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    lecturer: React.PropTypes.string,
  }).isRequired,
  submitQuestion: React.PropTypes.func.isRequired,
  submitLike: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Classroom);
