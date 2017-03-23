import React from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Form } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import 'static/css/font-awesome.css';

import { connect } from 'react-redux';

const Question = ({ question }) => (

  <div style={{ padding: '10px' }}>
    <p>
      <FontAwesome name="user" />
      &nbsp;
      <b>{ question.user }</b>
    </p>
    <p>{ question.text }</p>
  </div>
);

const listGroupItemStyle = {
  borderRadius: 5,
  border: '1px solid #888',
  boxShadow: '0px 5px 35px rgba(0, 0, 0, .7)',
  padding: '0px 0px',
  marginLeft: '30px',
  marginRight: '30px',
  marginBottom: '30px',
};

function mapStateToProps(state) {
  return {
    questions: state,
  };
}

export const Classroom = ({ questions, classroom, onSubmit }) => (
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
    <ListGroup>
      {
        questions.map(question => (
          <ListGroupItem key={question.id} style={listGroupItemStyle}>
            <Question question={question} />
          </ListGroupItem>
        ))
      }

    </ListGroup>
    <Form onSubmit={onSubmit} id="post">
      <input type="text" placeholder="Enter message" className="form-control" />
    </Form>
  </div>
);

Classroom.propTypes = {
  questions: React.PropTypes.arrayOf(React.PropTypes.object),
  classroom: React.PropTypes.shape({
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    lecturer: React.PropTypes.string,
  }),
};

export default connect(mapStateToProps)(Classroom);
