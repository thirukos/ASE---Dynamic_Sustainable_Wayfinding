import React from 'react'
import { getWeather } from '../helper/helper';

class Weather extends React.Component {
    async componentDidMount() {
      this.setState(
        {
          data: await this.fetchData()
        }
      )
    }
    fetchData = async () => {
      const data = await getWeather({ lat: '53.3498', lon: '-6.2603', date: '2023-03-22' });
      console.log(data)
      return data;
    }
    render() {
      console.log('front...')
      return <div>Weather API testing....</div>
    }
  }
  
  export default Weather;