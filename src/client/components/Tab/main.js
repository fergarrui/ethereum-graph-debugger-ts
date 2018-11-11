import React from 'react';

import TabMenuItem from './TabMenuItem/main.js';

import styles from '../../styles/Tab.scss';

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

    const classes = cx({
      'tab': true,
      'tab--state-active': '',
    });

    return (
      <div className={classes}>
        <div className={styles['tab__navigation']}>
          {React.Children.map(children, (child, i) => (
            <div className={styles['tab__navigation__item']}>
              <TabMenuItem
                key={i}
                name={child.props.name}
                onClick={() => this.setActiveTab(i)}
              />
            </div>
          ))}
        </div>
        <div className={styles['tab__body']}>
          {currentTab}
        </div>
      </div>
    );
  }
}

export default Tab;

Tab.displayName = 'Tab';