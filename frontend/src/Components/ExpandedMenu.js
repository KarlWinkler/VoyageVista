import React from 'react';

import { ReactComponent as HomeIcon} from '../Assets/home.svg';
import { ReactComponent as ProfileIcon} from '../Assets/profile.svg';

import '../styles/menu.scss';

const ExpandedMenu = () => {
  return (
    <div className="menu">
      <HomeIcon />
      <ProfileIcon />
    </div>
  );
};

export default ExpandedMenu;