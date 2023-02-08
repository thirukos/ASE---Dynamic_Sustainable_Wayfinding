import React from 'react'
// import { getPubTrans } from '../helper/helper'
// import axios from 'axios';
import { getPubTrans } from '../helper/helper';

class PublicTransportIRE extends React.Component {
  componentDidMount() {
    this.setState(
      {
        data: this.fetchData()
      }
    )
  }
  fetchData = async () => {
    const data = getPubTrans()
    console.log(data)
    return data;
  }
  render() {
    console.log('front...')
    return <div>Testing....</div>
  }
}

export default PublicTransportIRE;