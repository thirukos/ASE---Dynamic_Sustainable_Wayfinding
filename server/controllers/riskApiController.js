/**API key is not working, need to contact OpenWeather for support */

import fetch from 'node-fetch';

export async function getRisk(req, res){
    try {
      // Key to access Open Weather API
      const API_KEY = '0a4fce03fac7645929e9479525d776ef';
  
      // Required parameters 
      const { lat, lon, date } = req.params;
  
      // Convert date to Unix time
      const unixTime = Math.floor(new Date(date).getTime() / 1000);
  
      // Get road risk
      const roadriskUrl = `https://api.openweathermap.org/data/2.5/roadrisk?lat=${lat}&lon=${lon}&appid=${API_KEY}&dt=${unixTime}`;
      console.log('roadriskUrl:', roadriskUrl);
      const roadriskResponse = await fetch(roadriskUrl);
      const roadriskData = await roadriskResponse.json();
      console.log('roadriskData:', roadriskData);
  
      // Check if roadriskData has forecast array
      if (!roadriskData || !roadriskData.forecast || !Array.isArray(roadriskData.forecast) || roadriskData.forecast.length === 0) {
        throw new Error('Invalid roadrisk data');
      }
  
      // Parse the data and return it to the client
      const risk = {
        road_risk: roadriskData.forecast[0].roadRisk
      };
  
      return res.json(risk);
    } catch (error) {
      console.error('Error:', error);
      return res.status(404).send({ error : "Cannot find road risk data"});
    }
  }
  