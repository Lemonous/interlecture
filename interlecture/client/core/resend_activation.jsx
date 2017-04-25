import React from 'react';
import { render } from 'react-dom';
import Header from './header';

import * as bs from 'react-bootstrap';

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
    <Header user={window.django2react.username}
            firstname={window.django2react.firstname}
            lastname={window.django2react.lastname}
    />
    <bs.Panel>
      <bs.Form action="/login/" method="post">
        <bs.FormGroup>
          <bs.FormControl
            style={{ width: '100%' }}
            type="email" name="uname"
            placeholder="Email"
          />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.Button bsStyle="primary" type="submit">Resend activation</bs.Button>
          <bs.Button bsStyle="link" href="/register/">Register</bs.Button>
        </bs.FormGroup>
        <input type="hidden" name="csrfmiddlewaretoken" value={window.django2react.csrfToken} />
        {window.django2react.failedLogin &&
        <bs.FormGroup>
          <bs.Label bsStyle="danger" style={{ display: 'block' }}>
            <strong>No registered user with this email</strong>
          </bs.Label>
        </bs.FormGroup>
        }
      </bs.Form>
    </bs.Panel>
  </div>
);

render(<Main />, document.getElementById('main'));
