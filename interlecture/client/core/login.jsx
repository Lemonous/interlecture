import React from 'react';
import { render } from 'react-dom';

import * as bs from 'react-bootstrap';

function nextInputOnEnter(event) {
  if (event.key === 'Enter') {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    form.elements[index + 1].focus();
    event.preventDefault();
  }
}

const Main = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <bs.Panel>
      <bs.Form action="/login/" method="post">
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="uname"
            placeholder="Username" onKeyDown={nextInputOnEnter}
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl type="password" name="passwd" placeholder="Password" />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.Button bsStyle="primary" type="submit">Login</bs.Button>
          <bs.Button bsStyle="link" href="/register/">Register</bs.Button>
        </bs.FormGroup>
        <input type="hidden" name="csrfmiddlewaretoken" value={window.django2react.csrfToken} />
        {window.django2react.failedLogin &&
        <bs.FormGroup>
          <bs.Label bsStyle="danger" style={{ display: 'block' }}>
            <strong>Invalid username or password.</strong>
          </bs.Label>
        </bs.FormGroup>
        }
      </bs.Form>
    </bs.Panel>
  </div>
);

render(<Main />, document.getElementById('main'));
