import React from 'react';
import request from 'superagent';
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
      // NOTE: Storing here for demonstration purposes only.
      token: null,
      email: '',
      password: '',
      beaconList: {
        beaconOne: {
          isActive: true,
        },
      },
    };
  }
  componentDidMount() {
    request
      .post('api/v2/login')
      .send({ email: 'testing.demo@phy.net', password: 'testing.demo' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((err, res) => {
        // Calling the end function will send the request
        console.log(err, res);
      });
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
