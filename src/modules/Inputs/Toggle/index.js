import React from 'react';
import cn from 'classnames';
import { container, button, track, on, off, active } from './Toggle.css';

const Toggle = ({ isActive, onClick }) => {
  const containerState = isActive ? cn(container, active) : container;
  return (
    <div className={containerState} >
      <span className={off} >OFF</span>
      <div className={track} />
      <button className={button} type="text" placeholder="Search" onClick={onClick} />
      <span className={on} >ON</span>
    </div>
  );
};

Toggle.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
};

export default Toggle;
