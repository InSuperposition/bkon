import React from 'react';
import { normalize, Schema, arrayOf } from 'normalizr';
import sortBy from 'lodash.sortby';
import { getJson } from '../../modules/callApi';
import { list, item } from './BeaconList.css';
import Beacon from '../Beacon';
import Droplist from '../../modules/Inputs/Droplist';
import TextInput from '../../modules/Inputs/TextInput';

// BeaconList would be a container ( connected component ) if using Redux
class BeaconList extends React.Component {

  constructor() {
    super();
    this.state = {
      sort: 'default',
      beaconEntities: {
        result: [],
        entities: {},
      },
      options: [
        { value: 'default', label: 'Sort:' },
        { value: 'redirectUrl', label: 'Redirect URL' },
        { value: '_id', label: 'Id' },
        { value: 'name', label: 'Name' },
        { value: 'batteryLevel', label: 'Battery Level' },
      ],
      defaultOption: 0,
      pageSize: 8,
      pageIndex: 0,
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
      // FIXME: normalizing the data here is a quick and dirty approach
      // Using Immutable data structures can give some advantages here.
      const beaconSchema = new Schema('beacons', {
        idAttribute: '_id',
        defaults: { isSelected: false },
      });
      const beaconEntities = normalize(response, arrayOf(beaconSchema));
      this.setState({
        beaconEntities,
      });
    });
  }

  handleToggle = () => {

  }

  handleSelect = () => {

  }

  paginate = () => {

  }

  handleChange = (option) => {
    this.setState({
      sort: option.value,
    });
  }

  sort = (beacons) => {
    const { sort } = this.state;
    return sortBy(beacons, [function sortCallback(o) {
      if (sort === 'default') {
        // no-op
        return o;
      }
      return o[sort];
    }]);
  }

  render() {
    const {
      pageSize, pageIndex,
      options, defaultOption,
      beaconEntities: { entities },
    } = this.state;
    const value = options[defaultOption];
    // sort
    const sortedBeacons = this.sort(entities.beacons);
    // paginate
    const last = pageIndex + pageSize;
    const beacons = sortedBeacons.slice(pageIndex, last);

    return (
      <div>
        <h2>My phyIDs</h2>
        <Droplist options={options} value={value} onChange={this.handleChange} />
        <TextInput />
        <ul className={list} >{
          beacons.map((beacon) => (
            <li key={beacon._id} className={item} >
              <Beacon {...beacon} onSelect={this.handleSelect} onToggle={this.handleToggle} />
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
