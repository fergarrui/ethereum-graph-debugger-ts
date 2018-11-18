import React from 'react';

import TabMenuItem from './TabMenuItem/main.js';

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

  render() {
    const { children } = this.props;
    const { currentTabIndex } = this.state;

    const currentTab = React.Children.toArray(children).find((child, index) => index === currentTabIndex);

    return (
      <div className={styles['tab']}>
        <div className={styles['tab__navigation']}>
          {React.Children.map(children, (child, i) => (
            <TabMenuItem
              key={i}
              name={child.props.name}
              onClick={() => this.setActiveTab(i)}
              active={currentTabIndex === i}
            />
          ))}
        </div>
        <div className={styles['tab__panels']}>
          {currentTab}
        </div>
      </div>
    );
  }
}

export default Tab;

Tab.displayName = 'Tab';