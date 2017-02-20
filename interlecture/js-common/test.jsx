import React from 'react';
import { Button } from 'react-bootstrap';

const Test = ({
  size,
  color,
  text,
  clickButton,
}) => (
  <div
    style={{
      backgroundColor: color,
      fontSize: size,
    }}
  >
    { text }
    <Button onClick={() => clickButton()}>
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
