import React from 'react';
import { getJson } from '../../modules/callApi';
import { container, list, item, title, content, details, url, battery } from './BeaconList.css';
import Toggle from '../../modules/Inputs/Toggle';
import Checkbox from '../../modules/Inputs/Checkbox';
import Droplist from '../../modules/Inputs/Droplist';
import TextInput from '../../modules/Inputs/TextInput';

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
      beacons: null,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    getJson('api/v2/beacons',{
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },(response) => {
      this.setState({
        beacons: response,
      });
    });
  }

  render() {
    return (
      <div>
        <h2>myPhyIDs</h2>
        <Droplist />
        <TextInput />
        <ul className={list} >
          <li className={item} >
            <Beacon />
          </li>
        </ul>
      </div>
    );
  }
}

BeaconList.propTypes = {
  token: React.PropTypes.string,
};

export default BeaconList;
