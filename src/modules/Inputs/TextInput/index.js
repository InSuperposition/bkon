import React from 'react';
import cn from 'classnames';
import { container } from './TextInput.css';

const TextInput = ({ className }) => (
  <input type="text" className={cn(container, className)} placeholder="Search" />
);

TextInput.propTypes = {
  className: React.PropTypes.string,
};

export default TextInput;
