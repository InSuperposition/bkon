import React from 'react';
import { container, top, bottom, option, text, icon, action, avatar } from './Options.css';
import Gear from '../../assets/svgs/gear.svg';

const Options = () => (
  <section className={container} >
    <div className={top} >
      <div className={option}>
        <span className={text}>Bright Eyed Baby Happy Face</span>
        <button className={action} >
          <img src="https://placekitten.com/200/200" className={avatar} role="presentation" />
          <Gear className={icon} />
        </button>
      </div>
    </div>
    <div className={bottom} />
  </section>
);

export default Options;
