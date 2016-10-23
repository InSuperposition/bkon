import React from 'react';
import cn from 'classnames';
import { container, active, panel, toggle, logo, group, link, header, icon } from './Nav.css';
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

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: true,
    };
  }

  toggle = () => {
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive,
    });
  }

  render() {
    const { isActive } = this.state;
    return (
      <div className={isActive ? cn(container, active) : container} >
        <ArrowLeft className={toggle} onClick={this.toggle} />
        <div className={panel}>
          <Logo className={logo} />
          <NavGroup />
        </div>
      </div>
    );
  }
}

export default Nav;
