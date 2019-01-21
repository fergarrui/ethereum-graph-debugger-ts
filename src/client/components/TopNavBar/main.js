import React from 'react';

import Input from '../Input/main.js';

import styles from '../../styles/TopNavBar.scss';

const TopNavBar = ({ onInputChange, onInputSubmit }) => {
  return (
    <div className={styles['top-nav-bar']}>
      <Input 
        placeholder='Insert contracts path' 
        value='Load contracts from URI'
        onChange={onInputChange}
        onSubmit={onInputSubmit} 
      />
    </div>
  )
}

TopNavBar.displayName = 'TopNavBar';

export default TopNavBar;
