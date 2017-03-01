import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
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


const Classroom = ({ questions }) => (
  <div style={{ marginTop: '50px' }}>
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
};

export default Classroom;
