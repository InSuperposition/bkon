import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { container } from './Droplist.css';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  {
    type: 'group',
    name: 'group1',
    items: [
     { value: 'three', label: 'Three' },
     { value: 'four', label: 'Four' },
    ],
  },
  {
    type: 'group',
    name: 'group2',
    items: [
     { value: 'five', label: 'Five' },
     { value: 'six', label: 'Six' },
    ],
  },
];
const value = options[0];
const DropList = () => <div className={container} ><Dropdown options={options} value={value} placeholder="Sort" /></div>;

export default DropList;
