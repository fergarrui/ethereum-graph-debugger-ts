import React from 'react';

import InnerTabMenuItem from './InnerTabMenuItem/main.js';
import InnerTabPanel from './InnerTabPanel/main.js';

import styles from '../../../../styles/Tab/Tab.scss';

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

    const { data } = this.props;
    const { currentInnerTabIndex } = this.state;

    console.log(data);

    return (
      <div className={styles['tab']}>
        <div className={styles['tab__navigation']}>
          {data.map((item, i) => {
            return (
              <InnerTabMenuItem 
                key={i}  
                title={item.title}
                active={currentInnerTabIndex === i}
                onClick={() => this.setActiveInnerTab(i)}
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
