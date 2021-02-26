import React from 'react';
import { Image } from 'react-native';

import { iconBar } from './Constants';

export default function IconBar() {
  return (
    <Image
      source={iconBar}
      style={{
        width: 85,
        height: 60,
        marginLeft: 15,
      }}
    />
  );
}
