// TrafficLayerComponent.js
import React from 'react';
import { TrafficLayer } from '@react-google-maps/api';

function TrafficLayerComponent({ visible }) {
  return visible ? <TrafficLayer autoRefresh={true} /> : null;
}

export default TrafficLayerComponent;
