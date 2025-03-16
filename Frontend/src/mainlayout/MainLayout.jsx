import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className='flex-grow'>
                    <Outlet />
                    {/* this outlet replace the components according to the route */}
                </main>

                <Footer />
            </div>

        </>
    )
}

export default MainLayout