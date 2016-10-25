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
      // selected
      selectedBeacons: {},
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
      // Using immutable data structures can give some advantages here.
      // - prevent undefined errors
      // - memoizes lookups
      const beaconSchema = new Schema('beacons', {
        idAttribute: '_id',
        // NOTE: MOCK. Sets beacon's checkbox to false by default
        defaults: { isSelected: false },
      });
      const beaconEntities = normalize(response, arrayOf(beaconSchema));
      // set selected list to false, this list used for UI updates
      const selectedBeacons = beaconEntities.result.reduce(
        (prev, name) => (Object.assign({}, prev, { [name]: false })),
        {}
      );

      this.setState({
        beaconEntities,
        selectedBeacons,
      });
    });
  }

  handleToggle = (e) => {
    console.dir(name,e.target);
  }

  handleSelect = (beaconId) => () => {
    console.log(beaconId, this);
    const beaconList = this.state.selectedBeacons;
    const beaconState = this.state.selectedBeacons[beaconId];
    const selectedBeacons = Object.assign({}, beaconList, { [beaconId]: !beaconState });
    this.setState({
      selectedBeacons,
    });
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
      selectedBeacons,
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
            {/* Did not implement state change, no behavior */}
            <Checkbox isActive id={'mock'} onChange={() => {}} />
          </div>
        </header>
        <ul className={list} >{
          beacons.map((beacon) => (
            <li key={beacon._id} className={item} >
              <Beacon
                {...beacon}
                isSelected={selectedBeacons[beacon._id]}
                onSelect={this.handleSelect(beacon._id)}
                onToggle={this.handleToggle}
              />
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
