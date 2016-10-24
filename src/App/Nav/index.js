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
        iconName: 'hover',
      },
      {
        id: 'phyID',
        iconName: 'hover',
      },
      {
        id: 'Campaign',
        iconName: 'connect',
      },
      {
        id: 'Security',
        iconName: 'shield',
      },
      {
        id: 'Install Notes',
        iconName: 'news',
      },
      {
        id: 'Events',
        iconName: 'calendar',
      },
      {
        id: 'Metrics',
        iconName: 'graph',
      },
    ],
  },
  // Second Group
  {
    id: 'Add Button',
    iconName: 'add',
  },
  // Third Group
  {
    id: 'Libraries',
    iconName: 'grid',
    items: [
      {
        id: 'Destinations',
        iconName: 'hover',
      },
      {
        id: 'Labels',
        iconName: 'label',
      },
      {
        id: 'Media',
        iconName: 'image',
      },
    ],
  },
  // Fourth Group
  {
    id: 'Metrics',
    iconName: 'graph',
    items: [
      {
        id: 'Logs',
        iconName: 'hard-drive',
      },
    ],
  },
  // Fifth Group
  {
    id: 'Help',
    iconName: 'chat',
  },
  // Sixth Group
  {
    id: 'App: Home Depot',
    iconName: 'phone',
    items: [
      {
        id: 'Destinations',
        iconName: 'hover',
      },
      {
        id: 'Campaign',
        iconName: 'connect',
      },
      {
        id: 'Security',
        iconName: 'shield',
      },
      {
        id: 'Install Notes',
        iconName: 'news',
      },
    ],
  },
];

const Link = ({ id, iconName, isActive }) => {
  const linkState = isActive ? cn(active, link) : link;
  return (
    <a className={linkState} >
      <img src={`../../assets/svgs/${iconName}.svg`} className={icon} role="presentation" />
      {id}
    </a>
  );
};

Link.propTypes = {
  id: React.PropTypes.string,
  iconName: React.PropTypes.string,
  isActive: React.PropTypes.bool,
};

const NavGroup = ({ id, iconName, items = [] }) => {
  // Mock route state
  const activeGroup = 'Beacons';
  const activeLink = 'Destinations';
  const groupState = id === activeGroup ? cn(active, group) : group;
  return (
    <nav className={groupState}>
      <h3 className={header}><img src={`../../assets/svgs/${iconName}.svg`} className={icon} role="presentation" />{id}</h3>
      { items.map(item =>
        <Link key={item.id} {...item} isActive={(id === activeGroup) && (item.id === activeLink)} />
      )}
    </nav>
  );
};

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
