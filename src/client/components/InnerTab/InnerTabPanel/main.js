import React from 'react';

import styles from '../../../styles/Tab/RightTabPanel.scss';

const RightTabPanel = ({ children }) => {
  return (
    <div className={styles['right-tab-panel']}>
      {children}
    </div>
  );
}

export default RightTabPanel;