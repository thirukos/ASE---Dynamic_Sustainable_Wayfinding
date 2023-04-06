// DirectionRender.js

import React from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

function DirectionRendererComponent({ response, routeRequested }) {
  if (!routeRequested || !response) {
    return null;
  }

  return (
    <DirectionsRenderer
      options={{
        directions: response,
      }}
    />
  );
}

export default DirectionRendererComponent;
