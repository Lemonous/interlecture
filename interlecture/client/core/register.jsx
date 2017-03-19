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
      <bs.Form action="/register/" method="post">
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="username"
            placeholder="Username" onKeyDown={nextInputOnEnter}
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="firstname"
            placeholder="First Name" onKeyDown={nextInputOnEnter}
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="lastname"
            placeholder="Last Name" onKeyDown={nextInputOnEnter}
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="email" name="email"
            placeholder="you@example.com" onKeyDown={nextInputOnEnter}
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="password" name="passwd"
            placeholder="Password" onKeyDown={nextInputOnEnter}
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="password" name="passwd-check"
            placeholder="Confirm Password"
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.Button bsStyle="primary" type="submit" block>Register</bs.Button>
        </bs.FormGroup>
        <input type="hidden" name="csrfmiddlewaretoken" value={window.django2react.csrfToken} />
      </bs.Form>
    </bs.Panel>
  </div>
);

render(<Main />, document.getElementById('main'));
