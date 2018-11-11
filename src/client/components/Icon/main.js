import React from 'react';

import SVGInline from 'react-svg-inline';

import Menu from './SVG/menu.svg';
import Cross from './SVG/cross.svg';

const Icon = ({ iconName }) => {

  const icons = { Menu, Cross };

  return (
    <div>
      <SVGInline svg={icons[iconName]} />
    </div>
  );
}

Icon.displayName = 'Icon';

export default Icon;