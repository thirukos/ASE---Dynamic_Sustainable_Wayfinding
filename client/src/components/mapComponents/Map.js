import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, Marker } from '@react-google-maps/api';
import DirectionRendererComponent from './DirectionRender';
import markerImage from '../../assets/marker.jpg';
// import PlaceSearch from './PlaceSearch';
import TransitLayerComponent from './TransitLayer';
import TrafficLayerComponent from './TrafficLayer';
import './buttons.css';




const libraries = ['places']
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function Map(props) {

  const { destination, routeRequested, clearRoute, directionResponse, setDirectionResponse, setDistance} = props;
  const [transitLayerVisible, setTransitLayerVisible] = useState(false);
  const [trafficLayerVisible, setTrafficLayerVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [mapCenter, setMapCenter] = useState(null);

  
  const center = userLocation;
  
  const options = {
    // styles: mapStyle,
    disableDefaultUI: true
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    const updatePosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => console.log("Error getting user location.")
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    // Call the updatePosition function initially
    updatePosition();

    // Set up the interval to call updatePosition every 5 seconds
    const positionUpdateInterval = setInterval(updatePosition, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(positionUpdateInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

    mapRef.current = map;
  }, []);
  
  const directionsCallback = (googleResponse) => {
    if (googleResponse) {
      if (directionResponse) {
        if (
          googleResponse.status === 'OK' &&
          googleResponse.routes[0].overview_polyline !==
            directionResponse.routes[0].overview_polyline &&
          googleResponse.request.travelMode !== directionResponse.request.travelMode
        ) {
          setDirectionResponse(() => googleResponse);
          setMapCenter(googleResponse.routes[0].bounds.getCenter()); // Update map center
  
          // Get the distance between the starting point and destination
          const distance = googleResponse.routes[0].legs[0].distance;
          setDistance(distance.text); // Set the distance using the setDistance function
        } else {
          console.log('response: ', googleResponse);
        }
      } else {
        if (googleResponse.status === 'OK') {
          setDirectionResponse(() => googleResponse);
          setMapCenter(googleResponse.routes[0].bounds.getCenter()); // Update map center
  
          // Get the distance between the starting point and destination
          const distance = googleResponse.routes[0].legs[0].distance;
          setDistance(distance.text); // Set the distance using the setDistance function
        } else {
          console.log('response: ', googleResponse);
        }
      }
    }
  };
    
// add the traffic layer
  const toggleTrafficLayer = () => {
    setTrafficLayerVisible((prevState) => !prevState);
  };
  
// add the transit layer to this map
  const toggleTransitLayer = () => {
    setTransitLayerVisible(prevState => !prevState);
  };


// set travel mode
const changeTravelMode = (event) => {
  setTravelMode(event.target.value);
  props.onTravelModeChange(event.target.value);
};

// for test use
const simulateLocationChange = () => {
  if (userLocation) {
    setUserLocation((prevLocation) => ({
      ...prevLocation,
      lat: prevLocation.lat + 0.001, // Increment the latitude value
    }));
  }
};

const handleVisibilityChange = () => {
  if (document.visibilityState === "visible") {
    // Force a location update when the page becomes visible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.log("Error getting user location.")
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
};


useEffect(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);

  return (
    <div style={{ position: 'relative' }}>

<div className="map-buttons-container">
    <button className="map-button" onClick={simulateLocationChange}>
      Simulate
    </button>
    <button className="map-button" onClick={toggleTrafficLayer}>
      Traffic Layer
    </button>
    <button className="map-button" onClick={toggleTransitLayer}>
      Transit Layer
    </button>
  </div>
      <select
        value={travelMode}
        onChange={changeTravelMode}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
        }}
      >
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>

      <GoogleMap
  mapContainerStyle={containerStyle}
  center={mapCenter ? mapCenter : userLocation}
  zoom={15}
  options={options}
  onLoad={onMapLoad}
>

        { /* Child components, such as markers, info windows, etc. */ }
        <>
          <TrafficLayerComponent visible={trafficLayerVisible} />
          <TransitLayerComponent visible={transitLayerVisible} />
          {destination !== '' && routeRequested && ( // Add routeRequested check
    <DirectionsService
      options={{
        origin: userLocation,
        destination,
        travelMode: travelMode,
      }}
      callback={directionsCallback}
            />
          )}

          {userLocation && (
  <Marker
    key={`${userLocation.lat}-${userLocation.lng}-${Date.now()}`} // Add Date.now() to the key
    position={userLocation}
    icon={{
      url: markerImage,
      scaledSize: new window.google.maps.Size(30, 30),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(12.5, 12.5),
    }}
  />
)}


          
        </>
        <DirectionRendererComponent response={directionResponse} routeRequested={routeRequested} />
      </GoogleMap>
    </div>
  );
}


export default Map;