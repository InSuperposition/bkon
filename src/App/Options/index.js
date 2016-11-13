import React from 'react';
import { container, top, bottom, option, text, icon, action, avatar } from './Options.css';
import Gear from '../../assets/svgs/gear-alt.svg';
import image from '../../assets/images/avatar.png';

const Options = () => (
  <section className={container} >
    <div className={top} >
      <div className={option}>
        <span className={text}>Bright Eyed Baby Happy Face</span>
        <button className={action} >
          <img src={image} className={avatar} role="presentation" />
          <Gear className={icon} />
        </button>
      </div>
    </div>
    <div className={bottom} />
  </section>
);

export default Options;
