import React from 'react';
import { getJson } from '../../modules/callApi';
import { list, item } from './BeaconList.css';
import Beacon from '../Beacon';
import Droplist from '../../modules/Inputs/Droplist';
import TextInput from '../../modules/Inputs/TextInput';

class BeaconList extends React.Component {

  constructor() {
    super();
    this.state = {
      beacons: [],
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
    const { beacons } = this.state;
    const options = [
      { value: ' ', label: 'Sort:' },
      { value: 'redirectUrl', label: 'Redirect URL' },
      { value: '_id', label: 'Id' },
      { value: 'name', label: 'Name' },
      { value: 'batteryLevel', label: 'Battery Level' },
    ];
    const value = options[0];

    return (
      <div>
        <h2>My phyIDs</h2>
        <Droplist options={options} value={value} />
        <TextInput />
        <ul className={list} >{
          beacons.map((beacon) => (
            <li key={beacon._id} className={item} >
              <Beacon {...beacon} />
            </li>
          ))
        }</ul>
      </div>
    );
  }
}

BeaconList.propTypes = {
  token: React.PropTypes.string,
};

export default BeaconList;
