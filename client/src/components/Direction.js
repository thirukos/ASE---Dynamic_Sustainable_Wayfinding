import React, { useState, useEffect } from 'react';
import Map from './mapComponents/Map';
import PlaceSearch from './mapComponents/PlaceSearch';
import './Direction.css';
import WeatherCard from './WeatherCard';

import { useLoadScript } from '@react-google-maps/api';
import { Button } from 'antd';

import moment from 'moment';

const libraries = ['places']

function App() {
    
    const [destination, setDestination] = useState('Destination');
    const [geocodeOrigin, setGeocodeOrigin] = useState({});
    const [geocodeDestination, setGeocodeDestination] = useState([]);
    const [routeRequested, setRouteRequested] = useState(false);
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState(null);
    const [travelMode, setTravelMode] = useState('DRIVING');


    useEffect(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  setGeocodeOrigin({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  });
              },
              () => console.log("Error getting user location.")
          );
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  }, []);

    // ------------- required google places setting -----------
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyDHudCTTSaUll1GL3pZrbenn2cGGj531Q8',
      libraries,
    });
  
    if(loadError) return 'Error loading maps';
    if(!isLoaded) return 'Loading Maps';
  

    // const getOrigin = (ref) => {
    //   console.log('ref origin', ref)
    //   if (ref) {
    //     setGeocodeOrigin(ref);
    //   }
    // }

    const getDestination = (ref) => {
      console.log('ref Destination', ref);
      if (ref) {
        setGeocodeDestination({ lat: ref.lat, lng: ref.lng });
      }
    };

    const handleTravelModeChange = (mode) => {
      setTravelMode(mode);
    };
    
    // send to backend
    const sendDataToBackend = async (origin, destination) => {
      try {
        const response = await fetch('https://backend-server.com/api/endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            origin: origin,
            destination: destination,
            distance: distance, 
            travelMode: travelMode
          }),
        });
  
        if (!response.ok) {
          throw new Error('An error occurred while sending data to the backend.');
        }
  
        const responseData = await response.json();
        console.log('Data successfully sent to the backend:', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    // --------------  input function  --------------------------
  
    const getRoute = () => {
      if (destination !== "") {
        setDestination(destination);
        setRouteRequested(false);
        setRouteRequested(true);
        // Send data to the backend
        sendDataToBackend(geocodeOrigin, geocodeDestination, distance); // Pass the distance
      }
    };
    
    const clearRoute = () => {
      setRouteRequested(false);
      setDestination("");
      // Clear the directionResponse
      setDirectionResponse(null);
    };
    
    return (
      <div className="map-container">
        <Map destination={destination} 
        routeRequested={routeRequested} 
        directionResponse={directionResponse} 
        setDirectionResponse={setDirectionResponse} 
        setDistance={setDistance} 
        onTravelModeChange={handleTravelModeChange}/>
    
        <div className="controls-container">
          <h2>Dynamic Sustainable Wayfinding</h2>
          <PlaceSearch place={destination} setPlace={setDestination} getPlace={getDestination} />
          <Button className="map-button" type="primary" onClick={getRoute}>GO</Button>
          <Button className="map-button" type="danger" onClick={clearRoute} style={{ marginLeft: '10px' }}>
            END THIS TRIP
          </Button>
        </div>
        <WeatherCard/>
      </div>
    );
  }
  
  export default App;
