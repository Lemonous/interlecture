import React from 'react';
import { Jumbotron, Panel } from 'react-bootstrap';
import InputForm from '../questions/inputForm';

const ChooseCourse = () => (
  <Jumbotron>
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h1>Interlecture</h1>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Panel>
        <InputForm
          onSubmit={(event)=>{window.location.href=window.location.origin+"/course/"+event.value;}}
          id={'courseCode'}
          placeholder={'Enter course code'}
          submitButtonText={'Go to lecture'}
        />
      </Panel>
    </div>
  </Jumbotron>
);

export default ChooseCourse;
