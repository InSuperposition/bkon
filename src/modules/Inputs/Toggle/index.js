import React from 'react';
import cn from 'classnames';
import { container, button, track, on, off, active } from './Toggle.css';

const Toggle = ({ isActive }) => {
  const containerState = isActive ? cn(container, active) : container;
  return (
    <div className={containerState} >
      <span className={off} >Off</span>
      <div className={track} />
      <button className={button} type="text" placeholder="Search" />
      <span className={on} >On</span>
    </div>
  );
};

Toggle.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
};

export default Toggle;
