import React from 'react';
import 'whatwg-fetch';
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
      // NOTE: Storing authentication data here for demonstration purposes only.
      token: null,
      email: 'testing.demo@phy.net',
      password: 'testing.demo',
      beacons: null,
    };
  }
  componentDidMount() {
    const { email, password } = this.state;

    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    };

    const parseJSON = (response) => response.json();

    fetch('api/v2/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(({ body }) => {
      this.setState({
        token: body,
      });
    })
    .catch((error) => {
      // FIXME: handle error
      console.log('request failed', error);
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
