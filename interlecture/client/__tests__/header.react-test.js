import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../core/header';

function onSubmit(event) {
  event.preventdefault();
  console.log('onSubmit');
}

global.window = {}
window.django2react = {}
window.django2react.username = undefined
window.django2react.firstname = undefined
window.django2react.lastname = undefined

test('Login screen looks like it should', () => {
  const component = renderer.create(
    <Header
      user={window.django2react.username}
      firstname={window.django2react.firstname}
      lastname={window.django2react.lastname}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
