import React, { useState } from 'react';
import Map from './mapComponents/Map';
import PlaceSearch from './mapComponents/PlaceSearch';
import './Direction.css';


import { useLoadScript } from '@react-google-maps/api';
import { DatePicker, TimePicker, Checkbox, InputNumber, Slider, Button } from 'antd';

import moment from 'moment';

const libraries = ['places']

function App() {
    
    const [destination, setDestination] = useState('Destination');
    const [geocodeOrigin, setGeocodeOrigin] = useState({});
    const [geocodeDestination, setGeocodeDestination] = useState([]);
    const [routeRequested, setRouteRequested] = useState(false);
    const [directionResponse, setDirectionResponse] = useState(null);



    // ------------- required google places setting -----------
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: 'AIzaSyDHudCTTSaUll1GL3pZrbenn2cGGj531Q8',
      libraries,
    });
  
    if(loadError) return 'Error loading maps';
    if(!isLoaded) return 'Loading Maps';
  
    const getOrigin = (ref) => {
      console.log('ref origin', ref)
      if (ref) {
        setGeocodeOrigin(ref);
      }
    }
    

    const getDestination = (ref) => {
      console.log('ref Destination', ref);
      if (ref) {
        setGeocodeDestination(ref);
      }
    };

    
    // --------------  input function  --------------------------
  
    const getRoute = () => {
      if (destination !== '') {
        setDestination(destination); // Reset centerOnRoute to false
        setRouteRequested(false); // Set routeRequested to false first
        setRouteRequested(true); // Set routeRequested to true
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
        <Map destination={destination} routeRequested={routeRequested} directionResponse={directionResponse} setDirectionResponse={setDirectionResponse}/>
    
        <div className="controls-container">
          <h2>Dynamic Sustainable Wayfinding</h2>
          <PlaceSearch place={destination} setPlace={setDestination} getPlace={getDestination} />
          <Button className="map-button" type="primary" onClick={getRoute}>GO</Button>
          <Button className="map-button" type="danger" onClick={clearRoute} style={{ marginLeft: '10px' }}>
            END THIS TRIP
          </Button>
        </div>
      </div>
    );
  }
  
  export default App;
