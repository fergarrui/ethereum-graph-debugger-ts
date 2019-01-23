import React from 'react';
import { connect } from 'react-redux';

import { showLoadingMessage, hideLoadingMessage, showErrorMessage } from '../Store/Actions.js';

import Graph from '../Graph/main.js';

import styles from '../../styles/ControlFlowGraphComp.scss';

const mapDispatchToProps = dispatch => {
  return {
    loadingMessageOn: () => dispatch(showLoadingMessage()),
    loadingMessageOff: () => dispatch(hideLoadingMessage()),
    errorMessageOn: () => dispatch(showErrorMessage()),
  }
}

class ConnectedControlFlowGraphComp extends React.Component {
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
    this.props.loadingMessageOn();
  }

  handleRequestSuccess(response) {

    this.setState({
      fetchRequestStatus: 'success',
      cfg: response.cfg,
      operations: response.operations
    });

    this.props.loadingMessageOff();
  }

  handleRequestFail() {
    this.props.loadingMessageOff();
    this.props.errorMessageOn();
  }

  handleMessageButtonClick() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {
    const { cfg, fetchRequestStatus, operations } = this.state;
    const { contractName, contractPath } = this.props;

    return (
      <div className={styles['control-flow-graph-comp']}>
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
    );
  }
}

const ControlFlowGraphComp = connect(null, mapDispatchToProps)(ConnectedControlFlowGraphComp);

ControlFlowGraphComp.displayName = 'ControlFlowGraphComp';

export default ControlFlowGraphComp;
