import axios from 'axios';
import fetch from 'node-fetch';
export async function getScore(req, res){


    const data = await axios.get('https://api.nationaltransport.ie/gtfsr/v1?format=json', {
        headers: {
            'x-api-key': 'f1121f747e314c1d9b54f569b0b79d6f',
        }
    })
    .then(response => {
        return response.data
    })
    .catch(err => console.error(err));
    
    return res.json(data);
}
