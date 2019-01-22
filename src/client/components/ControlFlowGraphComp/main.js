import React from 'react';

import Graph from '../Graph/main.js';
import MessageComp from '../MessageComp/main.js'

import styles from '../../styles/ControlFlowGraphComp.scss';

class ControlFlowGraphComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchRequestStatus: undefined,
      messageVisible: false,
      cfg: '',
    }
  }

  componentDidMount() {
    const { contractName, contractCode, contractPath } = this.props;
    this.fetchData(contractName, contractCode, contractPath);   
  }

  fetchData(name, source, path) {
    this.handleRequestPending();

    const { contractName } = this.props;
    
    fetch(`http://localhost:9090/cfg/source?source=${encodeURIComponent(source)}&name=${contractName.replace('.sol', '')}&constructor=false&path=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => this.handleRequestSuccess(data))
      .catch(err => this.handleRequestFail);
  }

  handleRequestPending() {
    this.setState({
      fetchRequestStatus: 'pending',
    });
  }

  handleRequestSuccess(response) {

    this.setState({
      fetchRequestStatus: 'success',
      cfg: response.cfg,
      operations: response.operations
    });
  }

  handleRequestFail() {
    this.setState({
      fetchRequestStatus: 'fail',
      messageVisible: true,
    });
  }

  handleMessageButtonClick() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {
    const { cfg, fetchRequestStatus, operations, messageVisible } = this.state;
    const { contractName, contractPath } = this.props;

    return (
      <div className={styles['control-flow-graph-comp']}>
      <div className={styles['control-flow-graph-comp__loading']}>
        {fetchRequestStatus === 'pending' && 
          <MessageComp message='Loading...' />
        }
      </div>
      <div className={styles['control-flow-graph-comp__data']}>
        {fetchRequestStatus === 'success' &&
          <Graph 
            graphType="cfg" 
            graphId={contractName} 
            contractPath={contractPath} 
            cfg={cfg} 
            operations={operations}
          />
        }
      </div>
      <div className={styles['control-flow-graph-comp__error']}>
        {fetchRequestStatus === 'fail' && messageVisible &&
          <MessageComp 
            message='Sorry, there has been an error'
            onMessageButtonClick={() => this.handleMessageButtonClick()} />
        }  
      </div>    
      </div>
    );
  }
}

ControlFlowGraphComp.displayName = 'ControlFlowGraphComp';

export default ControlFlowGraphComp;
