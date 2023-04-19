import React, { useState, useEffect } from 'react';
import Map from './mapComponents/Map';
import PlaceSearch from './mapComponents/PlaceSearch';
import './Direction.css';
import WeatherCard from './WeatherCard';

import { useLoadScript } from '@react-google-maps/api';
import { Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getUserScore} from '../helper/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
const libraries = ['places'];

function App() {
  const [destination, setDestination] = useState('Destination');
  const [geocodeOrigin, setGeocodeOrigin] = useState({});
  const [geocodeDestination, setGeocodeDestination] = useState([]);
  const [routeRequested, setRouteRequested] = useState(false);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [vis, setVis] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(()=>{
    const localusername = localStorage.getItem('username')
    
    getUserScore(localusername).then(function (result) {
        setScore(Math.floor(result))
    }).catch(function (error) {
        console.error(error);
    });
    if (score > 100) setVis(true)



  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeocodeOrigin({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.log('Error getting user location.')
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDHudCTTSaUll1GL3pZrbenn2cGGj531Q8',
    libraries,
    language: 'en',
  });

  const getDestination = (ref) => {
    console.log('ref Destination', ref);
    if (ref) {
      setGeocodeDestination({ lat: ref.lat, lng: ref.lng });
    }
  };

  const handleTravelModeChange = (mode) => {
    setTravelMode(mode);
  };

  const sendDataToBackend = async (origin, destination, distance, travelMode) => {

    let distanceFloat = parseFloat(distance.split(' ')[0]);
    console.log(distanceFloat)
    try {
      const { data } = await axios.post('/api/route', {
        username:localStorage.getItem('username'),
        origin: "origin",
        desination: 'destination',
        distance: distanceFloat,
        transportmode: travelMode, 
        whetherscore: "0"
      })
    }
    catch (error) 
    {
      console.error('Error:', error);
    }
  

  };

  const handleBackendDataSend = () => {
    if (routeRequested && distance !== null) {
      console.log('Origin:', geocodeOrigin);
      console.log('Destination:', geocodeDestination);
      console.log('Travel Mode:', travelMode);
      console.log('Distance:', distance);
      sendDataToBackend(geocodeOrigin, geocodeDestination, distance, travelMode);
    }
  };

  useEffect(() => {
    handleBackendDataSend();
  }, [routeRequested, distance, geocodeOrigin, geocodeDestination, travelMode]);

  const getRoute = () => {
    if (destination !== '') {
      setDestination(destination);
      setRouteRequested(false);
      setRouteRequested(true);
    }
  };

  const clearRoute = () => {
    setRouteRequested(false);
    setDestination('');
    setDirectionResponse(null);
  };


  return (
    <div className="map-container">
      {loadError ? (
        <div>Error loading maps</div>
      ) : !isLoaded ? (
        <div>Loading Maps</div>
      ) : (
        <>
          <Map
            destination={destination}
            routeRequested={routeRequested}
            directionResponse={directionResponse}
            setDirectionResponse={setDirectionResponse}
            setDistance={setDistance}
            onTravelModeChange={handleTravelModeChange}
          />

          <div className="controls-container">
            <h2>Dynamic Sustainable Wayfinding</h2>
            <PlaceSearch
              place={destination}
              setPlace={setDestination}
              getPlace={getDestination}
            />
            <Button className="map-button" type="primary" onClick={getRoute}>
              GO
            </Button>
            <Button
              className="map-button"
              type="danger"
              onClick={clearRoute}
              style={{ marginLeft: '10px' }}
            >
              END THIS TRIP
            </Button>
          </div>
          <WeatherCard isVisible = {vis}/>
        </>
      )}
    </div>
  );


}

export default App;