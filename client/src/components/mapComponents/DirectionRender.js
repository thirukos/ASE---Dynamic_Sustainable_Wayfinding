import React from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';

const DirectionRendererComponent = ({ response }) => {
  return response ? (
    <DirectionsRenderer
      options={{
        directions: response,
      }}
    />
  ) : null;
};

export default DirectionRendererComponent;
