import React from 'react';

import Icon from '../../Icon/main.js';

import classnames from 'classnames/bind';

import styles from '../../../styles/Tab/TabMenuItem.scss';

const cx = classnames.bind(styles);

const InnerTabMenuItem = ({ title, onClick, active, onIconClick }) => {

  const classes = cx({
    'tab-menu-item': true,
    'tab-menu-item--active': !!active,
  });

  return (
    <div className={classes} onClick={onClick}>
      <div onClick={onIconClick} className={styles['tab-menu-item__icon']}>
        <Icon iconName='Cross' />
      </div>
      <div className={'tab-menu-item__text'}>
        <span>{title}</span>
      </div>
    </div>
  );
}


InnerTabMenuItem.displayName = 'InnerTabMenuItem';

export default InnerTabMenuItem;