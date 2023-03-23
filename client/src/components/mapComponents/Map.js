import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer, DirectionsService, Marker } from '@react-google-maps/api';
import PlaceSearch from './PlaceSearch';
import TransitLayerComponent from './TransitLayer';

const libraries = ['places']
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

function Map(props) {

  const { origin, destination } = props;
  const [response, setResponse] = useState(null);
  const [transitLayerVisible, setTransitLayerVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);


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
      if(response) {
        if (googleResponse.status === 'OK' && googleResponse.routes.overview_polyline !== response.routes.overview_polyline) {
          setResponse(() => googleResponse)
        } else {
          console.log('response: ', googleResponse)
        }
      } else {
        if (googleResponse.status === 'OK') {
          setResponse(() => googleResponse)
        } else {
          console.log('response: ', googleResponse)
        }
      }
    } 
  };


  

  const toggleTransitLayer = () => {
    setTransitLayerVisible(prevState => !prevState);
  };


  return (
    <div style={{ position: 'relative' }}>
      <button

      onClick={toggleTransitLayer}
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 10
      }}
      > 
      Toggle Transit Layer
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
          
          <TransitLayerComponent visible={transitLayerVisible} />
          {destination !== '' && origin !== '' && (
            <DirectionsService 
              options={{
                origin,
                destination,
                travelMode: 'DRIVING'
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