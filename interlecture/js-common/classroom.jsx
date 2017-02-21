import React from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import 'static/css/font-awesome.css';
// import 'static/fonts/fontawesome-webfont.eot';

const Question = ({ question }) => (
  <div style={{ padding: '10px' }}>
    <p>
      <FontAwesome name="user" />
      &nbsp;
      <b>{ question.user }</b>
    </p>
    <p>{ question.body }</p>
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


const Classroom = ({ questions, classroom }) => (
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

export default Classroom;
