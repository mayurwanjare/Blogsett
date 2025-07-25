import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth';

const Privateroute=()=> {

    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"}  />
}

export default Privateroute