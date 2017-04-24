import React from 'react';

import * as bs from 'react-bootstrap';

function headerStyle() {
  return {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 255), rgba(0, 0, 0, 0))',
    height: '200px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  };
}

function menuStyle() {
  return {
    color: 'white',
    width: '100%',
    textAlign: 'right',
    padding: '5px 10px',
  };
}

function logoStyle() {
  return {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontSize: '50pt',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: '300',
    marginTop: '50px',
  };
}

function headerButtonStyle() {
  return {
    color: 'white',
  };
}

function userLabelStyle() {
  return {
    float: 'left',
    height: '34px',
    padding: '6px 12px',
  };
}

function headerInputStyle() {
  return {
    color: 'black',
    borderRadius: '2px',
    border: 'none',
    padding: '6px 12px',
  };
}

function classroomTitleStyle() {
  return {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontSize: '32pt',
    fontFamily: 'Raleway, serif',
    fontWeight: '400',
  };
}

const Header = ({
                  user,
                  firstname,
                  lastname
                }) => (
  <header style={headerStyle()}>
    <div style={menuStyle()}>
      {(user &&
        /* Logged in code */
        <div>
          <p style={userLabelStyle()}>{firstname} {lastname} ({user})</p>
          {window.django2react.appName === 'app' &&
          <bs.Form method="post" action="/courses/" style={{ display: 'inline-block' }}>
            <input type="text" name="name" placeholder="Course code" style={headerInputStyle()} />
            <input type="hidden" name="csrfmiddlewaretoken" value={window.django2react.csrfToken} />
          </bs.Form>
          }
          <bs.Button bsStyle="link" style={headerButtonStyle()} href="/logout/">Logout</bs.Button>
        </div>
        /* End logged in code */
      ) ||
      /* Logged out code */
      <p>&nbsp;</p>
        /* End logged out code */
      }
      <div style={logoStyle()}>
        INTERLECTURE
      </div>

      {window.django2react.classroom &&
        <div style={classroomTitleStyle()}>
          {window.django2react.classroom.name.toUpperCase()} - {window.django2react.classroom.lecturer.toUpperCase()}
        </div>
      }
    </div>
  </header>
);

Header.PropTypes = {
  user: React.PropTypes.string,
  firstname: React.PropTypes.string,
  lastname: React.PropTypes.string,
};

Header.defaultProps = {
  user: undefined,
  firstname: undefined,
  lastname: undefined,
};

export default Header;
