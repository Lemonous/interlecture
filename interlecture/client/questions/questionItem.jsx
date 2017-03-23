import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


function changeLook() {
  console.log('changeLookClicked');
}

const QuestionItem = ({
  question,
  color,
}) => (
  <div
    style={{
      padding: '10px',
      backgroundColor: color,
    }}
  >
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={8}>{
          <div>
            <p>
              <FontAwesome name="user" />
                &nbsp;
              <b>{ question.user }</b>
            </p>
            <p>
                &nbsp;
                &nbsp;
              { question.text }
            </p>
            <Button
              onClick={changeLook}
            >
                Like
                &nbsp;
                <FontAwesome name="thumbs-up" />
            </Button>
            <Button
              onClick={changeLook}
            >
                Reply
                &nbsp;
                <FontAwesome name="reply" />
            </Button>
          </div>}</Col>
        <Col xs={6} md={4}>{
          <p>
            <FontAwesome name="clock-o" />
                &nbsp;
              TimeAndDate
          </p>}</Col>

      </Row>
    </Grid>
  </div>
);
QuestionItem.propTypes = {
  question: React.PropTypes.shape({
    id: React.PropTypes.number,
    user: React.PropTypes.string,
    body: React.PropTypes.string,
  }).isRequired,
  color: React.PropTypes.string,
};

QuestionItem.defaultProps = {
  color: '#fff',
};
export default QuestionItem;
