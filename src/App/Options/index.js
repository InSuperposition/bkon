import React from 'react';
import { container, top, bottom, option, icon } from './Options.css';
import Gear from '../../assets/svgs/gear.svg';

const Options = () => (
  <section className={container} >
    <div className={top} >
      <div className={option}>
        <span>Bright Eyed Baby Happy Face</span>
        <div>
          <img role="presentation" />
          <Gear className={icon} />
        </div>
      </div>
    </div>
    <div className={bottom} />
  </section>
);

export default Options;
