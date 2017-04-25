import React from 'react';
import { render } from 'react-dom';
import Header from './header';

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
    <Header user={window.django2react.username}
            firstname={window.django2react.firstname}
            lastname={window.django2react.lastname}
    />
    <bs.Panel>
      <bs.Form action="/register/" method="post">
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="username" defaultValue={window.django2react.username}
            placeholder="Username" onKeyDown={nextInputOnEnter}
          />
          {window.django2react.noUsername &&
          <bs.Label bsStyle="warning">Brukernavn må fylles inn</bs.Label>
          }
          {window.django2react.usernameInUse &&
          <bs.Label bsStyle="warning">Brukernavn finnes allerede</bs.Label>
          }
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="first_name" defaultValue={window.django2react.firstName}
            placeholder="First Name" onKeyDown={nextInputOnEnter}
          />
          {window.django2react.noFirstName &&
          <bs.Label bsStyle="warning">Fornavn må fylles inn</bs.Label>
          }
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="text" name="last_name" defaultValue={window.django2react.lastName}
            placeholder="Last Name" onKeyDown={nextInputOnEnter}
          />
          {window.django2react.noLastName &&
          <bs.Label bsStyle="warning">Etternavn må fylles inn</bs.Label>
          }
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="email" name="email" defaultValue={window.django2react.email}
            placeholder="you@example.com" onKeyDown={nextInputOnEnter}
          />
          {window.django2react.noEmail &&
          <bs.Label bsStyle="warning">Epost må fylles inn</bs.Label>
          }
          {window.django2react.notNtnuEmail &&
          <bs.Label bsStyle="warning">Eposten må være tilknyttet NTNU</bs.Label>
          }
          {window.django2react.emailInUse &&
          <bs.Label bsStyle="warning">Eposten er allerede i bruk</bs.Label>
          }
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="password" name="password"
            placeholder="Password" onKeyDown={nextInputOnEnter}
          />
          {window.django2react.noPassword &&
          <bs.Label bsStyle="warning">Passord må fylles inn</bs.Label>
          }
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.FormControl
            type="password" name="confirm_password"
            placeholder="Confirm Password"
          />
          {window.django2react.noConfirmPassword &&
          <bs.Label bsStyle="warning">Passord må fylles inn</bs.Label>
          }
          {window.django2react.noPasswordMatch &&
          <bs.Label bsStyle="warning">Passordene matcher ikke</bs.Label>
          }
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.Button bsStyle="primary" type="submit" className="single" block>Register</bs.Button>
        </bs.FormGroup>
        <input type="hidden" name="csrfmiddlewaretoken" value={window.django2react.csrfToken} />
      </bs.Form>
    </bs.Panel>
  </div>
);

render(<Main />, document.getElementById('main'));
