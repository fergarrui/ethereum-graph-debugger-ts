import React from 'react';

import Editor from './Editor/main.js';
import Icon from '../../Icon/main.js';
import SideBar from './SideBar/main.js';

import styles from '../../../styles/Tab/TabPanel.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorOpen: true,
      sideBarOpen: false,
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
    this.setState(previousState => ({
      sideBarOpen: !previousState.sideBarOpen,
    }));

    console.log('clicked');
  }

  render() {
    
    const { code } = this.props;
    const { editorOpen, sideBarOpen} = this.state;

    const editorClasses = cx({
      'tab-panel__left__editor': true,
      'tab-panel__left__editor--open': !!editorOpen,
    });

    const sideBarClasses = cx({
      'tab-panel__left__side-bar': true,
      'tab-panel__left__side-bar--open': !!sideBarOpen,
    });
    
    return (
      <div className={styles['tab-panel']}>
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
            <Editor code={code} />
          </div>
          <div className={sideBarClasses}>
            <SideBar />
          </div>
        </div>
        <div className={styles['tab-panel__right']}></div>
      </div>
    )
  }
}

TabPanel.displayName = 'TabPanel';

export default TabPanel;