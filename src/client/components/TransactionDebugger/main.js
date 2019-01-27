import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/TransactionDebugger.scss';

const TransactionDebugger = ({ cfg, operations, contractName, contractPath, trace }) => {

  return (
    <div className={styles['transaction-debugger']}>
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

TransactionDebugger.displayName = 'TransactionDebugger';

export default TransactionDebugger;
