import React from 'react';

import classnames from 'classnames/bind';

import styles from '../../../styles/Tab/TabMenuItem.scss';

const cx = classnames.bind(styles);

const TabMenuItem = ({ name, onClick, active }) => {

  const classes = cx({
    'tab-menu-item': true,
    'tab-menu-item--active': !!active,
  });

  return (
    <div className={classes} onClick={onClick}>
      <span>{name}</span>
    </div>
  );
}


TabMenuItem.displayName = 'TabMenuItem';

export default TabMenuItem;