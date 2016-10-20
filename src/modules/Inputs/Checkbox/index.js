import React from 'react';
import { container, input } from './Checkbox.css';

const Checkbox = ({ name }) => (
  <label htmlFor={name} className={container}>
    <input className={input} type="checkbox" name={name} />
  </label>
);

Checkbox.propTypes = {
  name: React.PropTypes.string,
};

export default Checkbox;
