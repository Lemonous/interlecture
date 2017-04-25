import React from 'react';
import { render } from 'react-dom';
import CourseSelect from './courseSelect.jsx';

const courseSelectContainer = () => <CourseSelect />;

render(<courseSelectContainer />, document.getElementById('main'));
