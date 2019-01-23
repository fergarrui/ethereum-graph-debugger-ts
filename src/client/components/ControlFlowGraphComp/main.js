import React from 'react';
import { connect } from 'react-redux';

import { showLoadingMessage, hideLoadingMessage, showErrorMessage, getErrorMessage } from '../Store/Actions.js';

import Graph from '../Graph/main.js';

import styles from '../../styles/ControlFlowGraphComp.scss';

const mapDispatchToProps = dispatch => {
  return {
    loadingMessageOn: () => dispatch(showLoadingMessage()),
    loadingMessageOff: () => dispatch(hideLoadingMessage()),
    errorMessageOn: () => dispatch(showErrorMessage()),
    getErrorMessage: message => dispatch(getErrorMessage(message)),
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
    
    fetch(`http://localhost:9090/cfg/source?source=${encodeURIComponent(source)}&name=${name.replace('.sol', '')}&constructor=false&path=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => {
        data.error 
        ? this.handleRequestFail(data.message) 
        : this.handleRequestSuccess(data);      
      })
      .catch(err => this.handleRequestFail(err));
  }

  handleRequestPending() {
    this.props.loadingMessageOn();
  }

  handleRequestSuccess(response) {

    this.setState({
      fetchRequestStatus: 'success',
      cfg: response.cfg,
      operations: response.operations,
    });

    this.props.loadingMessageOff();
  }

  handleRequestFail(message) {
    this.props.loadingMessageOff();
    this.props.errorMessageOn();
    this.props.getErrorMessage(message);
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
