import React from 'react';
import { container, toggle, logo, group, link, header, icon } from './Nav.css';
import Logo from '../../assets/svgs/logo-phynet.svg';
import ArrowLeft from '../../assets/svgs/arrow-left.svg';
import Beacons from '../../assets/svgs/beacons.svg';
import Select from '../../assets/svgs/select.svg';

const Link = () => (
  <a className={link} ><Select className={icon} />Destinations</a>
);

const NavGroup = () => (
  <nav className={group}>
    <h3 className={header}><Beacons className={icon} />Beacons</h3>
    <Link />
  </nav>
);

const handleClick = (e) => (console.log(e));

const Nav = () => (
  <div className={container} >
    <Logo className={logo} />
    <ArrowLeft className={toggle} onClick={handleClick} />
    <NavGroup />
  </div>
);

export default Nav;
