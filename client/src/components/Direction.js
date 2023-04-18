import React, { useState, useEffect } from 'react';
import Map from './mapComponents/Map';
import PlaceSearch from './mapComponents/PlaceSearch';
import './Direction.css';
import WeatherCard from './WeatherCard';

import { useLoadScript } from '@react-google-maps/api';
import { Button } from 'antd';
<<<<<<< HEAD
import axios from 'axios';
=======

>>>>>>> f25dd7b08c3c5ccf99322ba08efdee116ea44ad6
import moment from 'moment';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
const libraries = ['places'];

function App() {
<<<<<<< HEAD
  const [destination, setDestination] = useState('Destination');
  const [geocodeOrigin, setGeocodeOrigin] = useState({});
  const [geocodeDestination, setGeocodeDestination] = useState([]);
  const [routeRequested, setRouteRequested] = useState(false);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
=======
    
    const [destination, setDestination] = useState('Destination');
    const [geocodeOrigin, setGeocodeOrigin] = useState({});
    const [geocodeDestination, setGeocodeDestination] = useState([]);
    const [routeRequested, setRouteRequested] = useState(false);
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState(null);
    const [travelMode, setTravelMode] = useState('DRIVING');
>>>>>>> f25dd7b08c3c5ccf99322ba08efdee116ea44ad6

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

<<<<<<< HEAD
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
          <WeatherCard />
        </>
      )}
    </div>
  );


}

export default App;
=======
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
>>>>>>> f25dd7b08c3c5ccf99322ba08efdee116ea44ad6
