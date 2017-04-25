import React from 'react';
import renderer from 'react-test-renderer';
import CourseSelect from '../courses/courseSelect.jsx';

global.window = {};
window.django2react = {
  username: 'bob',
  firstname: 'bob',
  lastname: 'bob',
  doesNotExist: false,
  justLoggedIn: true,
  courseName: 'bob',
  csrfToken: 'bob',
  moderator_mode: false,
};

test('CourseSelect looks like it should', () => {
  const component = renderer.create(<CourseSelect />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
