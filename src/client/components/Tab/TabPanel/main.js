import React from 'react';

import Editor from '../../Editor/main.js';

import styles from '../../../styles/TabPanel.scss';

const TabPanel = ({ code, name }) => {

  return (
    <div className={styles['tab-panel']}>
      <div className={styles['tab-panel__header']}>
        <span>{name}</span>
      </div>
      <div className={styles['tab-panel__body']}>
        <Editor code={code} />
      </div>
    </div>
  )
}

TabPanel.displayName = 'TabPanel';

export default TabPanel;