import React from 'react';

import TransactionDebugger from '../../TransactionDebugger/main.js';
import Disassembler from '../../Disassembler/main.js';
import ControlFlowGraph from '../../ControlFlowGraph/main.js';

import styles from '../../../styles/Tab/InnerTabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const InnerTabPanel = ({ type, active, contractName, contractCode, contractPath, cfg, operations, bytecode, constructorOperations, runtimeOperations, trace }) => {

  const tabPanelClasses = cx({
    'inner-tab-panel': true,
    'inner-tab-panel--active': !!active,
  });

  return (
    <div className={tabPanelClasses}>
      {type === 'Transaction Debugger' && 
        <TransactionDebugger 
          contractPath={contractPath} 
          contractName={contractName} 
          cfg={cfg} 
          operations={operations} 
          trace={trace}
        />
      }
      {type === 'Disassembler' && 
        <Disassembler
          runtimeOperations={runtimeOperations}
          constructorOperations={constructorOperations}
          bytecode={bytecode}
        />
      }
      {type === 'Control Flow Graph' &&
        <ControlFlowGraph 
          contractPath={contractPath} 
          contractName={contractName} 
          contractCode={contractCode}
          cfg={cfg}
          operations={operations} 
        />
      }
    </div>
  );
}

InnerTabPanel.displayName = 'InnerTabPanel';

export default InnerTabPanel;
