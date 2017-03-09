import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


function changeLook() {
  console.log('changeLookClicked');
}

const QuestionItem = ({
  question,
  color,
  size,
}) => (
  <div
    style={{
      padding: '10px',
      backgroundColor: color,
      fontSize: size,
    }}
  >
    <p>
      <FontAwesome name="user" />
      &nbsp;
      <b>{ question.user }</b>
    </p>
    <p>{ question.text }</p>
  </div>
);
QuestionItem.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
};
export default QuestionItem;
//  clickButton: React.PropTypes.func.isRequired,
