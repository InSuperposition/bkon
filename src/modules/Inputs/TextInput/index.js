import React from 'react';
import cn from 'classnames';
import { container, icon, input } from './TextInput.css';
import Search from '../../../assets/svgs/search.svg';

const TextInput = ({ className }) => (
  <div className={cn(container, className)}>
    <Search className={icon} />
    <input type="text" className={input} placeholder="Search" />
  </div>
);

TextInput.propTypes = {
  className: React.PropTypes.string,
};

export default TextInput;
