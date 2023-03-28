import React, { useState } from 'react';
import Map from './mapComponents/Map';
import PlaceSearch from './mapComponents/PlaceSearch';
import './Direction.css';

import { useLoadScript } from '@react-google-maps/api';
import { DatePicker, TimePicker, Checkbox, InputNumber, Slider, Button } from 'antd';
import moment from 'moment';

const libraries = ['places']

function App() {
    const [origin, setOrigin] = useState('Origin');
    const [destination, setDestination] = useState('Destination');
    const[mode,setmode] = useState('');
    const [geocodeOrigin, setGeocodeOrigin] = useState({});
    const [geocodeDestination, setGeocodeDestination] = useState([]);



  
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
      if (origin !== '' && destination !== '') {
        setOrigin(origin);
        setDestination(destination);
      }
    };
  
  
    return (
      <div className="map-container">
        <Map origin={origin} destination={destination} />
  
        <div className="controls-container">
          <h2>Dynamic Sustainable Wayfinding</h2>
          <PlaceSearch place={origin} setPlace={setOrigin} getPlace={getOrigin} />
          <PlaceSearch place={destination} setPlace={setDestination} getPlace={getDestination} />
          <Button type="primary" onClick={getRoute}>Post</Button>
        </div>
      </div>
    );
  }


export default App;
