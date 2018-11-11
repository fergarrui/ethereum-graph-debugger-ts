import React from 'react';

import styles from '../../../styles/TabMenuItem.scss';

const TabMenuItem = ({ name, onClick }) => {
  return (
    <div className={styles['tab-menu-item']} onClick={onClick}>
      <span>{name}</span>
    </div>
  );
}

TabMenuItem.displayName = 'TabMenuItem';

export default TabMenuItem;