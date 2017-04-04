import React from 'react';
import { Jumbotron, Panel } from 'react-bootstrap';
import InputForm from '../questions/inputForm';

const CreateCourse = ({ createCourse }) => (
  <Jumbotron>
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h3>Create a new course:</h3>
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
          onSubmit={createCourse}
          id={'newCourse'}
          placeholder={'Enter course code'}
          submitButtonText={'Create Course'}
        />
      </Panel>
    </div>
  </Jumbotron>
);

CreateCourse.propTypes = {
  createCourse: React.PropTypes.func.isRequired,
};

export default CreateCourse;
