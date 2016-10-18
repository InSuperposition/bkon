import React from 'react';
import { container } from './Checkbox.css';

const Checkbox = ({ name }) => (
  <label htmlFor={name} className={container}>
    <input type="checkbox" name={name} />
  </label>
);

Checkbox.propTypes = {
  name: React.PropTypes.string,
};

export default Checkbox;
