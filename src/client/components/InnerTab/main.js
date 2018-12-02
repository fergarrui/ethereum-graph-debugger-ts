import React from 'react';

import TabMenuItem from '../Tab/TabMenuItem/main.js';
import InnerTabPanel from './InnerTabPanel/main.js';

import styles from '../../styles/Tab/Tab.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class InnerTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInnerTabIndex: 0,
    }
  }

  setActiveInnerTab(index) {
    this.setState({
      currentInnerTabIndex: index,
    });
  }

  // deleteTab(index) {

  //   const { tabs } = this.state;

  //   const newTabs = tabs.filter((item, i, arr) => arr.indexOf(item) !== index);

  //   this.setState({
  //     tabs: newTabs,
  //   });
  // }


  render() {

    const { data, contractName, contractCode } = this.props;
    const { currentInnerTabIndex, tabs } = this.state;

    return (
      <div className={styles['tab']}>
        <div className={styles['tab__navigation']}>
          {data.map((item, i) => {
            return (
              <TabMenuItem 
                key={i}  
                title={item.title}
                active={currentInnerTabIndex === i}
                onClick={() => this.setActiveInnerTab(i)}
                //onIconClick={() => this.deleteTab(i)}
              />
            )
          })}
        </div>
        <div className={styles['tab__panels']}>
          {data.map((item, i) => {
            return (
              <InnerTabPanel
                key={i}  
                type={item.type}
                active={currentInnerTabIndex === i}
                contractName={contractName}
                contractCode={contractCode}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default InnerTab;

InnerTab.displayName = 'InnerTab';
