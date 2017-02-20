
//  en komponent per fil
import React from 'react';
import { Button } from 'react-bootstrap';

const Test = props => ( // 1 objekt
  //   vi velger å kalle det props.
  <div
    style={{
      backgroundColor: props.color,
      fontSize: props.size,
    }}
  >
    {props.text}
    <Button onClick={() => props.clickButton()}>
      B1
    </Button>
    <Button onClick={() => props.clickButton()}>
      B2
    </Button>
  </div>
);
/*  const Test2 ==> (
  <div
    style={{
      backgroundColor:color,
      fontSize:size,
    }}
  >
    text}
    <Button onClick={() =>cB2()}>
      newB
    </Button>
  </div>
);
*/
/*  Test2.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  cB2: React.PropTypes.func.isRequired,
};
*/
//  Kun for error i konsoll. Ikke viktig
Test.propTypes = {
  color: React.PropTypes.string.isRequired,
  size: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  clickButton: React.PropTypes.func.isRequired,
};

export default Test;
//  export Test2;
