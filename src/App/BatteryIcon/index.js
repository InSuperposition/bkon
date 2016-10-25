import React from 'react';
import BatteryFull from '../../assets/svgs/battery-full.svg';
import BatteryHalf from '../../assets/svgs/battery-half.svg';
import BatteryLow from '../../assets/svgs/battery-low.svg';
import BatteryUnknown from '../../assets/svgs/battery-unknown.svg';


const BatteryIcon = ({ level }) => {
  let Icon = BatteryUnknown;
  if (typeof level === 'number') {
    if (level >= 0 && level < 0.4) {
      Icon = BatteryLow;
    } else if (level >= 0.4 && level < 0.9) {
      Icon = BatteryHalf;
    } else {
      Icon = BatteryFull;
    }
  }
  return (<Icon />);
};

BatteryIcon.propTypes = {
  level: React.PropTypes.number,
};

export default BatteryIcon;
