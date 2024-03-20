import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuthenticate = true
  return (
    <>
     <h1>PrivateRoutes</h1>
     {isAuthenticate ? <Outlet/> : <Navigate to='/' replace />} 
    </>
  )
}

export default PrivateRoutes
