import React from 'react';
import { normalize, Schema, arrayOf } from 'normalizr';
import sortBy from 'lodash.sortby';
import { getJson } from '../../modules/callApi';
import { container, header, search, title, inputs, list, item } from './BeaconList.css';
import Beacon from '../Beacon';
import Droplist from '../../modules/Inputs/Droplist';
import TextInput from '../../modules/Inputs/TextInput';
import Checkbox from '../../modules/Inputs/Checkbox';

// BeaconList would be a container ( connected component ) if using Redux
class BeaconList extends React.Component {

  constructor() {
    super();
    this.state = {
      // beacon state
      beaconEntities: {
        result: [],
        entities: {},
      },
      // sort state
      sort: 'default',
      options: [
        { value: 'default', label: 'Sort:' },
        { value: 'redirectUrl', label: 'Redirect URL' },
        { value: '_id', label: 'Id' },
        { value: 'name', label: 'Name' },
        { value: 'batteryLevel', label: 'Battery Level' },
      ],
      defaultOption: 0,
      // pagination state
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

  paginate = (forward = true) => {
    const {
      pageIndex,
      pageSize,
      beaconEntities: { result },
    } = this.state;
    if (forward) {
      // prevent out of bounds error
      if (pageIndex + pageSize < result.length - 1) {
        this.setState({
          pageIndex: pageIndex + pageSize,
        });
      }
    } else if (pageIndex - pageSize >= 0) {
      this.setState({
        pageIndex: pageIndex - pageSize,
      });
    }
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
        // returns intital order
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
      <div className={container}>
        <header className={header}>
          <h2 className={title} >My phyIDs</h2>
          <TextInput className={search} />
          <div className={inputs}>
            <Droplist options={options} value={value} onChange={this.handleChange} />
            <Checkbox />
          </div>
        </header>
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
