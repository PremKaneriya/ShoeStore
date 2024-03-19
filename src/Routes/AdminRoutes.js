import React from 'react'
import Products from '../user/container/Products/Products'
import { Route, Routes } from 'react-router-dom'

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="products/*" element={<Products />} />
            </Routes>
        </>
    )
}

export default AdminRoutes
