import React from 'react';
import merge from 'lodash.merge';
import range from 'lodash.range';
import { normalize, Schema, arrayOf } from 'normalizr';
import sortBy from 'lodash.sortby';
import { getJson } from '../../modules/callApi';
import { container, header, search, title, inputs, list, item, edit } from './BeaconList.css';
import Beacon from '../Beacon';
import Pagination from '../Pagination';
import Droplist from '../../modules/Inputs/Droplist';
import TextInput from '../../modules/Inputs/TextInput';
import Checkbox from '../../modules/Inputs/Checkbox';
import EditIcon from '../../assets/svgs/edit-button.svg';

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
      headers: {
        Authorization: `BEARER ${token}`,
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

  updateBeaconState = (beaconId, { disabled }) => {
    const beaconState = this.state.beaconEntities;
    // deep merge
    const beaconEntities = merge(
      {}, beaconState,
      { entities: { beacons: { [beaconId]: { disabled } } } }
    );
    // Optimistic update of toggle position animation
    this.setState({
      beaconEntities,
    });
  }

  update = (beaconId, { disabled }) => {
    const { token } = this.props;
    getJson(`api/v2/beacons/${beaconId}`,{
      method: 'PUT',
      headers: {
        Authorization: `BEARER ${token}`,
      },
      body: JSON.stringify({ disabled }),
    },
    (response) => this.updateBeaconState(response._id, { disabled: response.disabled })
  );
  }

  // TODO: Debounce toggle if setting state on server to limit network requests
  handleToggle = (beaconId, { disabled }) => () => {
    this.updateBeaconState(beaconId, { disabled: !disabled });

    // attempts to update endpoint
    this.update(beaconId, { disabled: !disabled });
  }

  handleSelect = (beaconId) => () => {
    const beaconList = this.state.selectedBeacons;
    const beaconState = this.state.selectedBeacons[beaconId];
    const selectedBeacons = Object.assign({}, beaconList, { [beaconId]: !beaconState });
    this.setState({
      selectedBeacons,
    });
  }

  gotoPage = (page) => () => {
    const {
      pageSize,
    } = this.state;
    this.setState({
      pageIndex: (page - 1) * pageSize,
    });
  }

  paginate = (forward = true) => () => {
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
      beaconEntities: { entities, result },
      selectedBeacons,
    } = this.state;
    const value = options[defaultOption];
    // sort
    const sortedBeacons = this.sort(entities.beacons);
    // paginate
    const last = pageIndex + pageSize;
    const beacons = sortedBeacons.slice(pageIndex, last);
    const pages = range(1, Math.ceil(result.length / pageSize) + 1);
    const currentPage = Math.floor(pageIndex / pageSize) + 1;
    return (
      <div className={container}>
        <header className={header}>
          <h2 className={title} >My phyIDs</h2>
          <TextInput className={search} />
          <div className={inputs}>
            <Droplist options={options} value={value} onChange={this.handleChange} />
            {/* Did not implement state change, no behavior */}
            <Checkbox isActive id={'mock'} onChange={() => {}} />
            <EditIcon className={edit} />
          </div>
        </header>
        <Pagination
          onPaginate={this.paginate}
          onGoto={this.gotoPage}
          pages={pages}
          currentPage={currentPage}
        />
        <ul className={list} >{
          beacons.map((beacon) => (
            <li key={beacon._id} className={item} >
              <Beacon
                {...beacon}
                isSelected={selectedBeacons[beacon._id]}
                onSelect={this.handleSelect(beacon._id)}
                onToggle={this.handleToggle(beacon._id, { disabled: beacon.disabled })}
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
