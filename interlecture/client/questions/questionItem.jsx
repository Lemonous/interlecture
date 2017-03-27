import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


function changeLook() {
  console.log('changeLookClicked');
}

const QuestionItem = ({
  question,
  color,
  submitLike,
}) => (
  <div
    style={{
      padding: '10px',
      backgroundColor: color,
    }}
  >
    <Grid style={{ width: 'inherit' }}>
      <Row className="show-grid" style={{ width: 'inherit' }}>
        <Col xs={8} md={8} lg={8}>{
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
          </div>}</Col>
        <Col xs={4} md={4} lg={4}>{
          <p>
            <FontAwesome name="clock-o" />
                &nbsp;
              { question.datetime.substr(0, 19) }
          </p>}
          <Button
            onClick={ event => (submitLike(event, question.id)) }
          >
            Like
            &nbsp;
            <FontAwesome name="thumbs-up" />
            { question.supporters }
          </Button>
        </Col>

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
  submitLike: React.PropTypes.func.isRequired,
};

QuestionItem.defaultProps = {
  color: '#fff',
};
export default QuestionItem;
