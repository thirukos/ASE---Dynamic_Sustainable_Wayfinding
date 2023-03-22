import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';


import connect from './database/connection.js';
import auth from './routes/authentication.js';

/**Importing weather api */
import weatherApi from './routes/weatherApi.js';
import riskApi from './routes/riskApi.js';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors({origin: '*'}));
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 3000;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', auth)
app.use('/api', weatherApi)
app.use('/api', riskApi)



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


export default app;