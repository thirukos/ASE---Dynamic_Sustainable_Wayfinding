import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer, DirectionsService, Marker } from '@react-google-maps/api';
import PlaceSearch from './PlaceSearch';
import TransitLayerComponent from './TransitLayer';
import TrafficLayerComponent from './TrafficLayer';

const libraries = ['places']
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function Map(props) {

  const { origin, destination } = props;
  const [response, setResponse] = useState(null);
  const [transitLayerVisible, setTransitLayerVisible] = useState(false);
  const [trafficLayerVisible, setTrafficLayerVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');


  const center = {
    lat: 53.350140,
    lng: -6.266155
  };
  
  const options = {
    // styles: mapStyle,
    disableDefaultUI: true
  }

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    if (navigator.geolocation) {
      const watchID = navigator.geolocation.watchPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => console.log('Error getting user location.'),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
  
      // Clean up the watcher when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchID);
      };
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
    mapRef.current = map;
  }, []);
  
  


  const directionsCallback = (googleResponse) => {
    if (googleResponse) {
      if (response) {
        if (
          googleResponse.status === 'OK' &&
          googleResponse.routes[0].overview_polyline !==
            response.routes[0].overview_polyline &&
          googleResponse.request.travelMode !== response.request.travelMode
        ) {
          setResponse(() => googleResponse);
        } else {
          console.log('response: ', googleResponse);
        }
      } else {
        if (googleResponse.status === 'OK') {
          setResponse(() => googleResponse);
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
};

const refreshUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => console.log('Error getting user location.')
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
};

  return (
    <div style={{ position: 'relative' }}>

      <button
        onClick={toggleTrafficLayer}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '10px',
          zIndex: 10,
        }}
      >
        Toggle Traffic Layer
      </button>

      <button

        onClick={toggleTransitLayer}
        style={{
          position: 'absolute',
          bottom: '70px',
          right: '10px',
          zIndex: 10,
      }}
      > 
      Toggle Transit Layer
      </button>

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

      <button
        onClick={refreshUserLocation}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '270px',
          zIndex: 10
        }}
      >
        Refresh Current Location
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        options={options}
        onLoad={onMapLoad}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
          <TrafficLayerComponent visible={trafficLayerVisible} />
          <TransitLayerComponent visible={transitLayerVisible} />
          {destination !== '' && origin !== '' && (
            <DirectionsService 
              options={{
                origin,
                destination,
                travelMode: travelMode
              }}
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer 
              options={{
                directions: response
              }}
            />
          )}
          {userLocation && (
  <Marker
    position={userLocation}
    icon={{
      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      scaledSize: new window.google.maps.Size(25, 25),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(12.5, 12.5)
    }}
  />
)}

          
        </>
      </GoogleMap>
    </div>
  );
}


export default Map;