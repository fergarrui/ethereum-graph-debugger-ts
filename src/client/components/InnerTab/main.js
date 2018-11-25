import React from 'react';

import InnerTabMenuItem from './InnerTabMenuItem/main.js';
import InnerTabPanel from './TabPanel/main.js';

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

  render() {
    const { contracts } = this.props;
    const { currentInnerTabIndex } = this.state;
    console.log('CHILDREN')
    console.log(this.props.children)

    return (
      <div className={styles['tab']}>
        <div className={styles['tab__navigation']}>
          {contracts.map((item, i) => {
            return (
              <InnerTabMenuItem
                key={i}
                name={item.name}
                onClick={() => this.setActiveInnerTab(i)}
                active={currentInnerTabIndex === i}
              />
            )
          })}        
        </div>
        <div className={styles['tab__panels']}>
          {contracts.map((item, i) => {
            return (
              <InnerTabPanel
                key={i}
                active={currentInnerTabIndex === i}
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