import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shoes from '../admin/Shoes/Shoes'
import Layout from '../admin/Layout/Layout'
import PrivateRoutes from './PrivateRoutes'
import ShoeBrand from '../admin/ShoeBrand/ShoeBrand'
import Category from '../admin/Category/Category'

const AdminRoutes = () => {
    return (
        <>
            <Layout>
                <Routes element={<PrivateRoutes />}>
                    <Route path="shoes/" element={<Shoes />} />
                    <Route path="shoebrand/" element={<ShoeBrand />} />
                    <Route path="category/" element={<Category />} />
                </Routes>
            </Layout>
        </>
    )
}

export default AdminRoutes
