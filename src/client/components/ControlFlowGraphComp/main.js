import React from 'react';

import Graph from '../Graph/main.js';

import styles from '../../styles/ControlFlowGraphComp.scss';

class ControlFlowGraphComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchRequestStatus: undefined,
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
      .catch(err => console.log(err));
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
    });
  }

  render() {
    const { cfg, fetchRequestStatus, operations } = this.state;
    const { contractName, onGraphClick, contractPath } = this.props;

    return (
      <div className={styles['control-flow-graph-comp']}>
        {fetchRequestStatus === 'pending' && 
          <div>loading</div>
        }
        {fetchRequestStatus === 'success' &&
          <Graph onGraphClick={onGraphClick} graphId={contractName} contractPath={contractPath} cfg={cfg} operations={operations}/>
        }
        {fetchRequestStatus === 'fail' &&
          <div>failed</div>
        }      
      </div>
    );
  }
}

ControlFlowGraphComp.displayName = 'ControlFlowGraphComp';

export default ControlFlowGraphComp;
