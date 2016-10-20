import React from 'react';
import { container, list, item } from './BeaconList.css';
import Toggle from '../../modules/Inputs/Toggle';
import Checkbox from '../../modules/Inputs/Checkbox';

const Beacon = () => (
  <div className={container} >
    <Checkbox name={'test'} />
    <Toggle isActive />
  </div>
);

class BeaconList extends React.Component {
  constructor() {
    super();
    this.state = {
      beaconList: {
        beaconOne: {
          isActive: true,
        },
      },
    };
  }
  render() {
    return (
      <ul className={list} >
        <li className={item} >
          <Beacon />
        </li>
      </ul>
    );
  }
}

export default BeaconList;
