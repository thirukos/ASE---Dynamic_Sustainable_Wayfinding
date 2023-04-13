import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/clickbar.module.css';
import axios from 'axios';

export default function ScoreInterface() {
  const [stopName, setStopName] = useState('');

  const predict_delay = async () => {
    const apiUrl = 'http://localhost:5000/api';

    const data = {
        text: stopName
    };
    console.log('predict_delay');
    const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse.response);

    // Open the result in a new window
    const newWindow = window.open('', '_blank');
    newWindow.document.write(
      `<html>
        <head>
          <title>Bus Delay Prediction Result</title>
          <style>
            body {
              font-family: Arial, Helvetica, sans-serif;
              background-color: #F5F5F5;
            }
            h1 {
              text-align: center;
              margin-top: 2rem;
            }
            p {
              text-align: center;
              margin-top: 3rem;
              font-size: 1.5rem;
            }
          </style>
        </head>
        <body>
          <h1>Bus Delay Prediction Result</h1>
          <p>${jsonResponse.response}</p>
        </body>
      </html>`
    );
    newWindow.document.close();
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Bus Delay Prediction</h1>
      <div className="flex justify-center items-center" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div className={styles.glass} style={{ width: '45%', paddingTop: '2em' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Please input a bus stop.</h3>
          <input type="text" value={stopName} onChange={(e) => setStopName(e.target.value)} placeholder="Enter stop name" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '5px', border: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }} />
          <div className={styles.glass2} onClick={() => predict_delay()} style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
            <h5 style={{ margin: '0' }}>Predict Delay</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
