import React from 'react';
import { Button } from 'react-bootstrap';

function changeLook() {
  console.log('changeLookClicked');
}

const QuestionItem = ({
  color,
  size,
  //  clickButton,
}) => (
  <div
    style={{
      backgroundColor: color,
      fontSize: size,
    }}
  >
    <Button onClick={() => changeLook()}>
      newButton
    </Button>
  </div>
);
QuestionItem.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
};
export default QuestionItem;
//  clickButton: React.PropTypes.func.isRequired,
