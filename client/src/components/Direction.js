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
      console.log('ref Destination', ref)
      if(ref) {
        setGeocodeDestination(ref);
      }
    }
  
    // --------------  input function  --------------------------
  
    const getRoute = () => {
      if (destination !== '') {
        setDestination(destination);
        setCenterOnRoute(false); // Reset centerOnRoute to false
        setRouteRequested(false); // Set routeRequested to false first
        setRouteRequested(true); // Set routeRequested to true
      }
    };
    
    
  
    return (
      <div className="map-container">
        <Map destination={destination} routeRequested={routeRequested} />
  
        <div className="controls-container">
          <h2>Dynamic Sustainable Wayfinding</h2>
          {/* Remove the PlaceSearch component for origin */}
          <PlaceSearch place={destination} setPlace={setDestination} getPlace={getDestination} />
          <Button type="primary" onClick={getRoute}>Post</Button>
        </div>
      </div>
    );
  }
  
  export default App;
