import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/username';
import Password from './components/password';
import Register from './components/register';
import Profile from './components/profile';
import Recovery from './components/recovery';
import Reset from './components/reset';
import PageNotFound from './components/pageNotFound';
// import PublictransTest from './components/publictranstest';
import PublicTransportIRE from './components/publicTransportIRE';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
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
    // {
    //     path : '/publictransportire',
    //     element : <PublicTransportIRE></PublicTransportIRE>
    // },
    // {
    //     path : '/publictransTest',
    //     element : <PublictransTest></PublictransTest>
    // },
    // {
    //     // for any invalid route
    //     path : '*',
    //     element : <PageNotFound></PageNotFound>
    // },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}