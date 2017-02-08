import React from 'react';
import { Button } from 'react-bootstrap';

const test = props => (
  <div style={{
      backgroundColor: props.color,
      fontSize: props.size,
    }}>
    {props.text}
    <Button onClick={() => props.clickButton()}>
      click me plz
    </Button>
  </div>
);

export default test;
