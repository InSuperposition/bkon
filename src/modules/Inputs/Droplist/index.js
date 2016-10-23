import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { container } from './Droplist.css';

const DropList = ({ options, value, onChange }) =>
  <div className={container} >
    <Dropdown options={options} value={value} placeholder="Sort:" onChange={onChange} />
  </div>;

DropList.propTypes = {
  onChange: React.PropTypes.func,
  options: React.PropTypes.object,
  value: React.PropTypes.string,
};

export default DropList;
