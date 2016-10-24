import React from 'react';
import cn from 'classnames';
import { container, active, panel, toggle, logo, group, link, header, icon } from './Nav.css';
import Logo from '../../assets/svgs/logo-phynet.svg';
import ArrowLeft from '../../assets/svgs/arrow-left.svg';

const groupList = [
  // First Group
  {
    id: 'Beacons',
    iconName: 'beacons',
    items: [
      {
        id: 'Destinations',
        iconName: 'select',
      },
      {
        id: 'phyID',
        iconName: 'select',
      },
      {
        id: 'Campaign',
        iconName: 'select',
      },
      {
        id: 'Security',
        iconName: 'sheild',
      },
      {
        id: 'Install Notes',
        iconName: 'select',
      },
      {
        id: 'Events',
        iconName: 'calendar',
      },
      {
        id: 'Metrics',
        iconName: 'select',
      },
    ],
  },
  // Second Group
  {
    id: 'Add Button',
    iconName: 'plus',
  },
  // Third Group
  {
    id: 'Libraries',
    iconName: 'grid',
    items: [
      {
        id: 'Destinations',
        iconName: 'select',
      },
      {
        id: 'Labels',
        iconName: 'select',
      },
      {
        id: 'Media',
        iconName: 'select',
      },
    ],
  },
  // Fourth Group
  {
    id: 'Metrics',
    iconName: 'grid',
    items: [
      {
        id: 'Logs',
        iconName: 'select',
      },
    ],
  },
  // Fifth Group
  {
    id: 'Help',
    iconName: 'grid',
  },
  // Sixth Group
  {
    id: 'App: Home Depot',
    iconName: 'grid',
    items: [
      {
        id: 'Destinations',
        iconName: 'select',
      },
      {
        id: 'Campaign',
        iconName: 'select',
      },
      {
        id: 'Security',
        iconName: 'sheild',
      },
      {
        id: 'Install Notes',
        iconName: 'select',
      },
    ],
  },
];

const Link = ({ id, iconName }) => (
  <a className={link} >
    <img src={`../../assets/svgs/${iconName}.svg`} className={icon} role="presentation" />
    {id}
  </a>
);

Link.propTypes = {
  id: React.PropTypes.string,
  iconName: React.PropTypes.string,
  // items: React.PropTypes.array,
};

const NavGroup = ({ id, iconName, items = [] }) => (
  <nav className={group}>
    <h3 className={header}><img src={`../../assets/svgs/${iconName}.svg`} className={icon} role="presentation" />{id}</h3>
    { items.map(item => <Link key={item.id} {...item} />) }
  </nav>
);

NavGroup.propTypes = {
  id: React.PropTypes.string,
  iconName: React.PropTypes.string,
  items: React.PropTypes.array,
};

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
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
          <Logo src={'../../assets/svgs/logo.svg'} className={logo} role="presentation" />
          { groupList.map(item => <NavGroup key={item.id} {...item} />) }
        </div>
      </div>
    );
  }
}

export default Nav;
