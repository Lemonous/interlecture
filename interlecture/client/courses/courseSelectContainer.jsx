import React from 'react';
import { render } from 'react-dom';
import CourseSelect from './courseSelect.jsx';

const CourseSelectContainer = () => <CourseSelect />;

render(<CourseSelectContainer />, document.getElementById('main'));
