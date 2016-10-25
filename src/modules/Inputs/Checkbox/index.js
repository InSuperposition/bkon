import React from 'react';
import { container, input, checkmark } from './Checkbox.css';
import Checkmark from '../../../assets/svgs/checkmark.svg';

const Checkbox = ({ id, isActive, onChange }) => (
  <button className={container} onClick={onChange} >
    { isActive && <Checkmark className={checkmark} /> }
    <input className={input} type="checkbox" name={id} />
  </button>
);

Checkbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  // name: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
};

export default Checkbox;
