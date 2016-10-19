import React from 'react';
import { container, list, item } from './BeaconList.css';

const Beacon = () => (
  <div className={container} >hi</div>
);

const BeaconList = () => (
  <ul className={list} >
    <li className={item} ><Beacon /></li>
  </ul>
);

export default BeaconList;
