import React from 'react';

import Editor from './Editor/main.js';
import Icon from '../../Icon/main.js';
import SideBar from './SideBar/main.js';

import InnerTab from './InnerTab/main.js';

import styles from '../../../styles/Tab/TabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorOpen: true,
      sideBarOpen: false,
      tabs: [],
      innerTabVisible: false,
    }
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
    this.setState(prevState => ({
      sideBarOpen: !prevState.sideBarOpen,
    }));
  }

  handleSideBarItemClick(compType) {
    const newTabs = [...this.state.tabs, {'title': compType, 'type': compType}];
    this.setState({
      tabs: newTabs,
      innerTabVisible: true,
    }); 
  }

  render() {
    
    const { code, active, index, children } = this.props;
    const { editorOpen, sideBarOpen, innerTabVisible, tabs } = this.state;

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
    })

    
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
              <button onClick={() => this.handleMenuIconClick()}><Icon iconName='Menu' /></button>
            </div>
          </div>
          <div className={sideBarClasses}>
            <SideBar onClick={(compType) => this.handleSideBarItemClick(compType)}/>
          </div>
          <div className={editorClasses}>
            <Editor code={code} index={index}/>
          </div>
        </div>
        <div className={styles['tab-panel__right']}>
          {innerTabVisible && <InnerTab data={tabs}>{children}</InnerTab>}
        </div>
      </div>
    )
  }
}

TabPanel.displayName = 'TabPanel';

export default TabPanel;
