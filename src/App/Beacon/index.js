import React from 'react';
import { container, controls, title, content, details, url, battery } from './Beacon.css';
import Toggle from '../../modules/Inputs/Toggle';
import Checkbox from '../../modules/Inputs/Checkbox';

const Beacon = ({
  disabled, name, redirectUrl,
  _id, batteryLevel, isSelected,
  onSelect, onToggle,
}) => (
  <div className={container} >
    <div className={controls} >
      <Checkbox isActive={isSelected} id={_id} onChange={onSelect} />
      <Toggle isActive={!disabled} onClick={onToggle} />
      <h2 className={title}>{_id}</h2>
    </div>
    <div className={content}>
      <span className={details}>{name}</span>
      <span className={url}>{redirectUrl}</span>
    </div>
    <div className={battery}>{batteryLevel}</div>
  </div>
);

Beacon.propTypes = {
  _id: React.PropTypes.string,
  batteryLevel: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  name: React.PropTypes.string,
  redirectUrl: React.PropTypes.string,
  isSelected: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  onToggle: React.PropTypes.func,
};

export default Beacon;
