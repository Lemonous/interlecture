
//  en komponent per fil
import React from 'react';
import { Button } from 'react-bootstrap';

<<<<<<< HEAD
const Test = props => ( // 1 objekt
  //   vi velger å kalle det props.
=======
const Test = ({
  size,
  color,
  text,
  clickButton,
}) => (
>>>>>>> 8f40513c6d2a8a9f8273b88aeb602ae0ba169a4f
  <div
    style={{
      backgroundColor: color,
      fontSize: size,
    }}
  >
<<<<<<< HEAD
    {props.text}
    <Button onClick={() => props.clickButton()}>
      B1
    </Button>
    <Button onClick={() => props.clickButton()}>
      B2
=======
    { text }
    <Button onClick={() => clickButton()}>
      click me plz
>>>>>>> 8f40513c6d2a8a9f8273b88aeb602ae0ba169a4f
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
