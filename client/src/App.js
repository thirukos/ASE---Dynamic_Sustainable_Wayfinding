import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/username';
import Password from './components/password';
import Register from './components/register';
import Profile from './components/profile';
import Recovery from './components/recovery';
import Reset from './components/reset';
import Direction from './components/Direction';
import PageNotFound from './components/pageNotFound';
import PublicTransportIRE from './components/publicTransportIRE';
import ScoreUI from './components/Scoring/ScoreUI';
import Prediction from './components/prediction';

// import Weather from './components/weatherAPI';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {

        path: '/direction',
        element: <Direction></Direction>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/publictransportire',
        element : <PublicTransportIRE></PublicTransportIRE>
    },
    {
        path:'/score',
        element: <ScoreUI></ScoreUI>
    },
        {
        path : '/DelayPrediction',
        element : <Prediction></Prediction>
    },
    // {
    //     path : '/weather',
    //     element : <Weather></Weather>
    // }
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}