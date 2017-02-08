import React from 'react';

const test = props => (
  <div style={{
      backgroundColor: props.color,
      fontSize: props.size,
    }}>
    {props.text}
  </div>
);

export default test;
