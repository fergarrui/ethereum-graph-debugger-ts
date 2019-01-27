import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/ControlFlowGraph.scss';

const ControlFlowGraph = ({ contractName, contractPath, cfg, operations }) => {
  return (
    <div className={styles['control-flow-graph']}>
        <Graph 
          graphType="cfg" 
          graphId={contractName} 
          contractPath={contractPath} 
          cfg={cfg} 
          operations={operations}
        />
    </div>
  );
}

ControlFlowGraph.displayName = 'ControlFlowGraph';

export default ControlFlowGraph;
