import React from 'react';

import Input from './Input/main.js';

import styles from '../../styles/TopNavBar.scss';

const TopNavBar = ({ onInputChange, onInputSubmit }) => {
  return (
    <div className={styles['top-nav-bar']}>
      <Input 
        onChange={onInputChange}
        onSubmit={onInputSubmit} 
      />
    </div>
  )
}

TopNavBar.displayName = 'TopNavBar';

export default TopNavBar;
