import React from 'react';
import { container, list, item, title, content, details, url, battery } from './BeaconList.css';
import Toggle from '../../modules/Inputs/Toggle';
import Checkbox from '../../modules/Inputs/Checkbox';

const Beacon = () => (
  <div className={container} >
    <Checkbox name={'test'} />
    <Toggle isActive />
    <h2 className={title}>pHy1d</h2>
    <div className={content}>
      <span className={details}>Device Alias Here</span>
      <span className={url}>https://destination.com/abcdefghijklmn1234567890</span>
    </div>
    <div className={battery}>Icon</div>
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
