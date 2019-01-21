import React from 'react';

import Icon from '../Icon/main.js';

import styles from '../../styles/LoadingComp.scss';

const LoadingComp = () => (
  <div className={styles['loading-comp']}>
    <div className={styles['loading-comp__main']}>
      <div className={styles['loading-comp__main__text']}>
        <h1>Loading</h1>
      </div>
      <div className={styles['loading-comp__main__spinner']}>
        <Icon iconName='Spinner' />
      </div>
    </div>
  </div>
)

LoadingComp.displayName = 'LoadingComp';

export default LoadingComp;