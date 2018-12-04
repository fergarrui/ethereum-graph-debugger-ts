import React from 'react';

import TabMenuItem from './TabMenuItem/main.js';
import TabPanel from './TabPanel/main.js';

import styles from '../../styles/Tab/Tab.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTabIndex: 0,
    }
  }

  setActiveTab(index) {
    this.setState({
      currentTabIndex: index,
    });
  }

  handleIconClick(event, index) {
    event.stopPropagation();

    this.setState({
        currentTabIndex: index === this.state.currentTabIndex ? index : this.state.currentTabIndex,
    });

    this.props.onMenuItemIconClick(index);
  }

  render() {
    const { contracts } = this.props;
    const { currentTabIndex, tabs } = this.state;

    return (
      <div className={styles['tab']}>
        <div className={styles['tab__navigation']}>
          {contracts.map((item, i) => {
            return (
              <TabMenuItem
                key={i}
                name={item.name}
                onClick={() => this.setActiveTab(i)}
                onIconClick={(e) => this.handleIconClick(e, i)}
                active={currentTabIndex === i}
              />
            )
          })}        
        </div>
        <div className={styles['tab__panels']}>
          {contracts.map((item, i) => {
            return (
              <TabPanel
                key={i}
                name={item.name}
                code={item.code}
                index={i}
                active={currentTabIndex === i}>
              </TabPanel>
            )
          })}    

        </div>
      </div>
    );
  }
}

export default Tab;

Tab.displayName = 'Tab';
