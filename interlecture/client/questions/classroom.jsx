import React from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Form } from 'react-bootstrap';
import 'static/css/font-awesome.css';
import { connect } from 'react-redux';
import QuestionItem from './questionItem';
import PostList from './postList';

function mapStateToProps(state) {
  return {
    questions: state,
  };
}

export const Classroom = ({ questions, classroom, submitQuestion, submitReply }) => (
  <div style={{ marginTop: '50px' }}>
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
    <PostList posts={questions} submitReply={submitReply}/>
    <Form onSubmit={submitQuestion} id="post">
      <input type="text" placeholder="Enter message" className="form-control" />
    </Form>
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
};

export default connect(mapStateToProps)(Classroom);
