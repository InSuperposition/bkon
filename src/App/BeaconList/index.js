import React from 'react';
import { container, list, item } from './BeaconList.css';
import Toggle from '../../modules/Inputs/Toggle';
import Checkbox from '../../modules/Inputs/Checkbox';

const Beacon = () => (
  <div className={container} >
    <Checkbox />
    <Toggle isActive />
  </div>
);

const BeaconList = () => (
  <ul className={list} >
    <li className={item} >
      <Beacon />
    </li>
  </ul>
);

export default BeaconList;
