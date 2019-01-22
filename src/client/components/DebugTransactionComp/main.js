import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/DebugTransactionComp.scss';

const DebugTransactionComp = ({ cfg, operations, contractName, contractPath }) => {

  return (
    <div className={styles['debug-transaction-comp']}>
      <div className={styles['debug-transaction-comp__body']}>
        <Graph graphId={contractName} contractPath={contractPath} cfg={cfg} operations={operations}/>
      </div>
    </div>
  );
}

DebugTransactionComp.displayName = 'DebugTransactionComp';

export default DebugTransactionComp;
