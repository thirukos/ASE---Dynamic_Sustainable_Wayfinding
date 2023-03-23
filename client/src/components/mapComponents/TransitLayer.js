import React from 'react';
import { TransitLayer } from '@react-google-maps/api';

function TransitLayerComponent({ visible }) {
    return visible ? <TransitLayer /> : null;
  }

export default TransitLayerComponent;
