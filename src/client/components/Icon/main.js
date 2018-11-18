import React from 'react';

import SVGInline from 'react-svg-inline';

import CircleLeft from './SVG/circle-left.svg';
import CircleRight from './SVG/circle-right.svg';
import Menu from './SVG/menu.svg';

import styles from '../../styles/Icon.scss';

const Icon = ({ iconName }) => {

  const icons = { CircleLeft, CircleRight, Menu };

  return (
    <div className={styles['icon']}>
      <SVGInline svg={icons[iconName]} />
    </div>
  );
}

Icon.displayName = 'Icon';

export default Icon;