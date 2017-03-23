import React from 'react';
import { Form } from 'react-bootstrap';

const InputForm = ({ onSubmit, id, placeholder, onSubmitExtras, submitButtonText }) => (
  <div
    style={{
      width: '100%',
      paddingLeft: '5px',
      paddingRight: '5px',
    }}
  >
    <button
      type="submit"
      form={id}
      value="submitButton"
      className="btn btn-primary"
      style={{
        float: 'right',
      }}
    >
      {submitButtonText}
    </button>
    <div
      style={{
        overflow: 'hidden',
        paddingRight: '0.5rem',
      }}
    >
      <Form
        id={id}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({
            value: event.target[1].value,
            ...onSubmitExtras,
          });
        }
        }
      >
        <input
          type="text"
          placeholder={placeholder}
          className="form-control"
          style={{
            width: '100%',
          }}
        />
      </Form>
    </div>
  </div>
);

export default InputForm;
