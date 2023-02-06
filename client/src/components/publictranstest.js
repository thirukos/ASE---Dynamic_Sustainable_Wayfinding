import React from 'react'
import axios from 'axios';


export default function publictransTest() {
    axios.get('https://api.nationaltransport.ie/gtfsr/v1?format=json', {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': 'f1121f747e314c1d9b54f569b0b79d6f',}
    })
    .then(response => {
        console.log(response.status);
        console.log(response.text());
    })
    .catch(err => console.error(err));

    return (
    <div>Public-Transport-connection-test</div>
  )
}
