import React from 'react';
import { Button } from 'react-bootstrap';

const Test = props => (
  <div
    style={{
      backgroundColor: props.color,
      fontSize: props.size,
    }}
  >
    {props.text}
    <Button onClick={() => props.clickButton()}>
      click me plz
    </Button>
  </div>
);

Test.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  clickButton: React.PropTypes.func.isRequired,
};

export default Test;
