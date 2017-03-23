import React from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Form } from 'react-bootstrap';
import 'static/css/font-awesome.css';
import { connect } from 'react-redux';
import QuestionItem from './questionItem';
import InputForm from './inputForm';

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

export const Classroom = ({ questions, classroom, submitQuestion, submitReply }) => (
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
    <ListGroup>
      {
        questions.map(question => (
          <ListGroupItem key={question.id} style={listGroupItemStyle}>
            <QuestionItem question={question} />
            <InputForm
              onSubmit={submitReply}
              id={`replyTo${question.id}`}
              placeholder={'Enter reply'}
              submitButtonText={'Submit Reply'}
              onSubmitExtras={{ questionId: question.id }}
            />
            <Form onSubmit={event => submitReply(event, event.target[0].value, question.id)} id={`replyTo${question.id}`}>
              <input type="text" placeholder="Enter reply" className="form-control" />
            </Form>
          </ListGroupItem>
        ))
      }
    </ListGroup>
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
};

export default connect(mapStateToProps)(Classroom);
