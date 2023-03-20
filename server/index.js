import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
// import 


import connect from './database/connection.js';
import auth from './routes/authentication.js';
import publicTransportIre from './routes/pubtrans.js';


const app = express();

/** middlewares */
app.use(express.json());
// app.use(cors());
app.use(cors({origin: '*'}));
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 3000;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

// app.get('/publictransportire', (req, res) => {
//     // axios.get('https://api.nationaltransport.ie/gtfsr/v1?format=json', {
//     //     headers: {
//     //         'x-api-key': 'f1121f747e314c1d9b54f569b0b79d6f',}
//     // })
//     // .then(response => {
//     //     console.log(response.status);
//     //     console.log(response.text());
//     // })
//     // .catch(err => console.error(err));
//     // res.status(201).json("NationalTransportAPI-connected");
//     res.json({
//         name : 'dumbasss'
//     })
// });


/** api routes */
app.use('/api', auth)

// app.use('/ipa', publicTransportIre)



/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})
