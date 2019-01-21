import React from 'react';

import Editor from '../../Editor/main.js';
import Icon from '../../Icon/main.js';
import SideBar from '../../SideBar/main.js';
import InnerTab from '../../InnerTab/main.js';
import Modal from '../../Modal/main.js';
import LoadingComp from '../../LoadingComp/main.js';

import styles from '../../../styles/Tab/TabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorOpen: true,
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

  fetchTrace(name, source, path, parameter) {
    this.handleRequestPending();
    
    fetch(`http://localhost:9090/debug/${parameter}/?source=${encodeURIComponent(source)}&name=${name.replace('.sol', '')}&path=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => this.handleRequestSuccess(data))
      .catch(err => console.log(err));
  }


  handleRequestPending() {
    this.setState({
      fetchRequestStatus: 'pending',
      modalOpen: false,
    });
  }

  handleRequestSuccess(response) {

    const newTabs = [...this.state.tabs, {'title': 'Debug Transaction', 'type': 'Debug Transaction'}];

    this.setState({
      fetchRequestStatus: 'success',
      cfg: response.cfg,
      operations: response.operations,
      trace: response.trace,
      tabs: newTabs,
    });
  }

  handleRequestFail() {
    this.setState({
      fetchRequestStatus: 'fail',
    });
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

    this.fetchTrace(name, code, path, parameter);
  }


  handleLeftIconClick() {
    this.setState({
      editorOpen: false,
    });
  }

  handleRightIconClick() {
    this.setState({
      editorOpen: true,
    });
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

  handleSideBarItemClick(compType) {

    const newTabs = [...this.state.tabs, {'title': compType, 'type': compType}];
    
    this.setState({
      tabs: newTabs,
      sideBarOpen: false,
    }); 

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

  handleDebugTransactionClick() {
    this.setState({
      modalOpen: true,
      sideBarOpen: false,
    });

    document.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    
    const { code, name, path, active, index, children } = this.props;
    const { editorOpen, tabs, sideBarOpen, operations, cfg, trace, modalOpen, fetchRequestStatus } = this.state;
    
    const editorClasses = cx({
      'tab-panel__left__editor': true,
      'tab-panel__left__editor--open': !!editorOpen,
    });

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
          <div className={styles['tab-panel__left__controls']}>
            <div className={styles['tab-panel__left__controls__item']}>
              {
                editorOpen 
                  ? <button onClick={() => this.handleLeftIconClick()}><Icon iconName='CircleLeft' /></button>
                  : <button onClick={() => this.handleRightIconClick()}><Icon iconName='CircleRight' /></button>
              }
            </div>
            <div className={styles['tab-panel__left__controls__item']}>
              <button onClick={() => this.handleMenuIconClick()}>
                <Icon iconName='Menu' />
              </button>
            </div>
          </div>
          <div 
            className={sideBarClasses}
            ref={node => { this.node = node; }}
          > 
            <SideBar 
              onClick={(compType) => this.handleSideBarItemClick(compType)}
              onDebugTransactionClick={() => this.handleDebugTransactionClick()}
            />
          </div>
          <div className={editorClasses}>
            <Editor code={code} index={index} />
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
              onMenuItemIconClick={this.handleMenuItemIconClick} 
            >
            {children}
          </InnerTab>
        </div>
        <div className={styles['tab-panel__modal']}>
        {
          modalOpen &&  
          (
            <Modal 
              onInputChange={(e) => this.handleInputChange(e)} 
              onInputSubmit={() => this.handleInputSubmit()}
              onIconClick={() => this.handleModalIconClick()}
            />
          )
        }
        </div>
        <div className={styles['tab-panel__loading']}>
          {
            fetchRequestStatus === 'pending' && <LoadingComp />
          }
        </div>
      </div>
    )
  }
}

TabPanel.displayName = 'TabPanel';

export default TabPanel;
