import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/DebugTransactionComp.scss';

const DebugTransactionComp = ({ cfg, operations, contractName, contractPath, trace }) => {

  return (
    <div className={styles['debug-transaction-comp']}>
        <Graph 
          graphId={contractName} 
          contractPath={contractPath} 
          cfg={cfg} 
          graphType="debug"
          operations={operations}
          trace={trace}
        />
    </div>
  );
}

DebugTransactionComp.displayName = 'DebugTransactionComp';

export default DebugTransactionComp;
