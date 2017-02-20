import React from 'react';
import { Button } from 'react-bootstrap';

const QuestionItem = props => (
  <div
    style={{
      backgroundColor: props.color,
      fontSize: props.size,
    }}
  >
    <Button onClick={() => props.clickButton()}>
      newButton
    </Button>
  </div>
);
Test.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  clickButton: React.PropTypes.func.isRequired,
};
