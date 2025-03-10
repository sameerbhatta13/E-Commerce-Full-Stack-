import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            {/* this outlet replace the components according to the route */}
            <Footer />

        </>
    )
}

export default MainLayout