import React from 'react';
import { connect } from 'react-redux';

import { showLoadingMessage, hideLoadingMessage, showErrorMessage, getErrorMessage } from '../../Store/Actions.js';

import Editor from '../../Editor/main.js';
import SideBar from '../../SideBar/main.js';
import InnerTab from '../../InnerTab/main.js';
import Modal from '../../Modal/main.js';
import EVMState from '../../EVMState/main.js';
import Hamburger from '../../Hamburger/main.js';

import styles from '../../../styles/Tab/TabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const mapStateToProps = state => {
  return {
    evm: state.selectEVMState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadingMessageOn: () => dispatch(showLoadingMessage()),
    loadingMessageOff: () => dispatch(hideLoadingMessage()),
    errorMessageOn: () => dispatch(showErrorMessage()),
    getErrorMessage: message => dispatch(getErrorMessage(message)),
  }
}

class ConnectedTabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarOpen: false,
      modalOpen: false,
      inputValue: '',
      prameter: '',
      tabs: [],
      cfg: '',
      operations: [],
      trace: {},
      fetchRequestStatus: undefined,
    }

    this.handleMenuItemIconClick = this.handleMenuItemIconClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  getUrl(endPoint, parameters) {
    let url = `http://localhost:9090/${endPoint}`
    const paramKeys = Object.keys(parameters)
    if (paramKeys.length) {
      url += '?';
    }
    url += paramKeys.map( key=> `${key}=${parameters[key]}`).join('&');
    return url;
  }

 fetchData(url, type) {
   this.handleRequestPending();

   fetch(url)
    .then(res => res.json())
    .then(data => {
      data.error 
      ? this.handleRequestFail(data.message) 
      : this.handleRequestSuccess(data, type);      
    })
    .catch(err => this.handleRequestFail(err));
 }

  // fetchTrace(name, source, path, parameter) {
  //   this.handleRequestPending();
    
  //   fetch(`http://localhost:9090/debug/${parameter}/?source=${encodeURIComponent(source)}&name=${name.replace('.sol', '')}&path=${encodeURIComponent(path)}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       data.error 
  //       ? this.handleRequestFail(data.message) 
  //       : this.handleTraceRequestSuccess(data);      
  //     })
  //     .catch(err => this.handleRequestFail(err));
  // }

  // fetchGraphData(name, source, path) {
  //   this.handleRequestPending();
  
  //   fetch(`http://localhost:9090/cfg/source?source=${encodeURIComponent(source)}&name=${name.replace('.sol', '')}&constructor=false&path=${encodeURIComponent(path)}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       data.error 
  //       ? this.handleRequestFail(data.message) 
  //       : this.handleGraphDataRequestSuccess(data);      
  //     })
  //     .catch(err => this.handleRequestFail(err));
  // }

  // fetchDisassembler(name, source, path) {
  //   this.handleRequestPending();
    
  //   fetch(`http://localhost:9090/disassemble/?source=${encodeURIComponent(source)}&name=${name.replace('.sol', '')}&constructor=false&path=${encodeURIComponent(path)}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     data.error 
  //     ? this.handleRequestFail(data.message) 
  //     : this.handleDisassemblerRequestSuccess(data);      
  //   })
  //   .catch(err => this.handleRequestFail(err));
  // }

  handleRequestPending() {
    this.setState({
      modalOpen: false,
      sideBarOpen: false,
    });

    this.props.loadingMessageOn();
  }

  // handleTraceRequestSuccess(response, type) {
  //   const newTabs = [...this.state.tabs, {'title': 'Transaction Debugger', 'type': 'Transaction Debugger'}];

  //   this.setState({
  //     cfg: response.cfg,
  //     operations: response.operations,
  //     trace: response.trace,
  //     fetchRequestStatus: 'success',
  //     tabs: newTabs,
  //   });

  //   this.props.loadingMessageOff();
  // }

  // handleGraphDataRequestSuccess(response) {
  //   const newTabs = [...this.state.tabs, {'title': 'Control Flow Graph', 'type': 'Control Flow Graph'}];

  //   this.setState({


  //     tabs: newTabs,
  //   });

  //   this.props.loadingMessageOff();
  // }

  handleRequestSuccess(response, type) {
    const newTabs = [...this.state.tabs, {'title': type, 'type': type}];

    if(type === 'Disassembler') {
      this.setState({
        bytecode: response.bytecode,
        constructorOperations: response.constructorOperations,
        runtimeOperations: response.runtimeOperations,
      });
    }

    this.setState({
      fetchRequestStatus: 'success',
      tabs: newTabs,
      cfg: response.cfg,
      operations: response.operations,
      trace: response.trace,
      sideBarOpen: false,
    }); 

    this.props.loadingMessageOff();
  }

  handleRequestFail(message) {
    this.props.loadingMessageOff();
    this.props.errorMessageOn();
    this.props.getErrorMessage(message);
  }

  handleInputChange(event) {
    const { value } = event.target;

    this.setState({
      inputValue: value,
      parameter: value,
    });
  }

  handleInputSubmit() {
    const { inputValue, parameter } = this.state;
    const { name, path, code } = this.props;

    this.setState({
      parameter: inputValue,
    });

    const params = {
      name: name.replace('.sol', ''),
      path: encodeURIComponent(path),
      source: encodeURIComponent(code)
    }

    this.fetchData(this.getUrl(`debug/${parameter}/`, params), 'Transaction Debugger');
  }

  handleMenuIconClick() {
    if (!this.state.sideBarOpen) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }

    this.setState(prevState => ({
      sideBarOpen: !prevState.sideBarOpen,
    }));
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }

    document.removeEventListener('click', this.handleOutsideClick);
  
    this.setState({
      sideBarOpen: false,
    });
  }

  handleControlFlowGraphClick() {
    const { name, path, code } = this.props;

    const params = {
      name: name.replace('.sol', ''),
      path: encodeURIComponent(path),
      source: encodeURIComponent(code),
      'constructor': false
    }
    this.fetchData(this.getUrl('cfg/source', params), 'Control Flow Graph');

    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleDisassemblerClick() {
    const { name, code, path } = this.props;

    const params = {
      name: name.replace('.sol', ''),
      path: encodeURIComponent(path),
      source: encodeURIComponent(code)
    }
    this.fetchData(this.getUrl('disassemble', params), 'Disassembler');

    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleMenuItemIconClick(index) {
    const newTabs = this.state.tabs.filter((item, i) => i !== index);

    this.setState({
      tabs: newTabs,
    });
  }

  handleModalIconClick() {
    this.setState({
      modalOpen: false,
    });
  }

  handleTransactionDebuggerClick() {
    this.setState({
      modalOpen: true,
      sideBarOpen: false,
    });

    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleMessageButtonClick() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {
    
    const { code, name, path, active, index, children, evm } = this.props;
    const { tabs, sideBarOpen, operations, cfg, trace, modalOpen, bytecode, runtimeOperations, constructorOperations } = this.state;

    const tabPanelClasses = cx({
      'tab-panel': true,
      'tab-panel--active': !!active,
    });

    const sideBarClasses = cx({
      'tab-panel__left__side-bar': true,
      'tab-panel__left__side-bar--open': !!sideBarOpen,
    });
    
    return (
      <div className={tabPanelClasses}>
        <div className={styles['tab-panel__left']}>
          <div className={styles['tab-panel__left__control']}>
            <button onClick={() => this.handleMenuIconClick()}>
              <Hamburger clicked={!!sideBarOpen} />
            </button>
          </div>
          <div 
            className={sideBarClasses}
            ref={node => { this.node = node; }}
          > 
            <SideBar 
              onDisassemblerClick={() => this.handleDisassemblerClick()}
              onTransactionDebuggerClick={() => this.handleTransactionDebuggerClick()}
              onControlFlowGraphClick={() => this.handleControlFlowGraphClick()}
            />
          </div>
          <div className={styles['tab-panel__left__data']}>
              <Editor code={code} index={index} />
              {
                evm && <EVMState />
              }
          </div>
        </div>
        <div className={styles['tab-panel__right']}>
           <InnerTab 
              data={tabs} 
              contractName={name}
              contractCode={code}
              contractPath={path}
              cfg={cfg}
              operations={operations}
              trace={trace}
              bytecode={bytecode}
              runtimeOperations={runtimeOperations}
              constructorOperations={constructorOperations}
              onMenuItemIconClick={this.handleMenuItemIconClick} 
            >
            {children}
          </InnerTab>
        </div>
        {
          modalOpen &&  
            <Modal 
              onInputChange={(e) => this.handleInputChange(e)} 
              onInputSubmit={() => this.handleInputSubmit()}
              onIconClick={() => this.handleModalIconClick()}
            />
        }
      </div>
    )
  }
}

const TabPanel = connect(mapStateToProps, mapDispatchToProps)(ConnectedTabPanel);

TabPanel.displayName = 'TabPanel';

export default TabPanel;
