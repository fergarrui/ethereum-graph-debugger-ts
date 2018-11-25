import React from 'react';

import Editor from './Editor/main.js';
import Icon from '../../Icon/main.js';
import SideBar from './SideBar/main.js';
import ByteCodeComp from '../../ByteCodeComp/main.js';
import DisassembleComp from '../../DisassembleComp/main.js';

import InnerTabPanel from '../../InnerTab/InnerTabPanel/main.js';

import styles from '../../../styles/Tab/TabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorOpen: true,
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

  render() {
    
    const { code, active, contracts, index } = this.props;
    const { editorOpen } = this.state;

    const editorClasses = cx({
      'tab-panel__left__editor': true,
      'tab-panel__left__editor--open': !!editorOpen,
    });

    const tabPanelClasses = cx({
      'tab-panel': true,
      'tab-panel--active': !!active,
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
              <button onClick={() => this.handleMenuIconClick()}><Icon iconName='Menu' /></button>
            </div>
          </div>
          <div className={editorClasses}>
            <Editor code={code} index={index}/>
          </div>
        </div>
        <div className={styles['tab-panel__right']}>
        </div>
      </div>
    )
  }
}

TabPanel.displayName = 'TabPanel';

export default TabPanel;