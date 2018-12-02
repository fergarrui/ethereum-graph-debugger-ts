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
      tabs: this.props.contracts,
    }
  }

  setActiveTab(index) {
    this.setState({
      currentTabIndex: index,
    });
  }

  deleteTab(index) {

    const { tabs } = this.state;

    const newTabs = tabs.filter((item, i, arr) => arr.indexOf(item) !== index);

    this.setState({
      tabs: newTabs,
    });
  }

  render() {
    const { contracts } = this.props;
    const { currentTabIndex, tabs } = this.state;

    return (
      <div className={styles['tab']}>
        <div className={styles['tab__navigation']}>
          {tabs.map((item, i) => {
            return (
              <TabMenuItem
                key={i}
                name={item.name}
                onClick={() => this.setActiveTab(i)}
                onIconClick={() => this.deleteTab(i)}
                active={currentTabIndex === i}
              />
            )
          })}        
        </div>
        <div className={styles['tab__panels']}>
          {tabs.map((item, i) => {
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
