import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import PropTypes from 'prop-types';

import icoMoonConfig from '../selection.json';

const Linericon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);

const CustomIcon = props => {
  return <Linericon {...props} />;
};

CustomIcon.propTypes = {
  type: PropTypes.string,
};

export default CustomIcon;
