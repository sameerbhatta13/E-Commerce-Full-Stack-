import React, { useState } from 'react'
import { useGetOneUserQuery } from '../redux/Api/UserApi'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/Slice/AuthSlice'
import { toast } from 'react-toastify'
import { APP_URL } from '../../config'

import { FiMenu, FiX } from 'react-icons/fi';


const UserDashboar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const { data: getUserProfile, error, isError } = useGetOneUserQuery()
    // console.log(getUserProfile?.data?.image)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
        toast.done('logging out')
    }

    return (
        <>

            <div className="min-h-screen bg-gray-100">
                {/* Sidebar */}


                {/* desktop site here  */}
                <aside className="hidden md:flex w-64 bg-[#16113A] text-white flex-col overflow-hidden fixed h-full">
                    <div className="  py-6 px-4 text-center text-xl font-semibold border-b border-blue-600 flex-col ">

                        <div className='flex flex-col '>
                            <Link to='/' className='font-thin bg-red-900 rounded-lg w-fit p-2 ml-10 hover:scale-105 mb-2'>Back To Home</Link>
                            <Link to=''> User Dashboard</Link>
                        </div>

                    </div>
                    <nav className="flex-1 px-4 py-4">
                        <ul>
                            <li className="mb-2">
                                <Link
                                    to='profile'
                                    title='profile'
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to='product'
                                    className="block px-4 py-2 rounded hover:bg-blue-600"

                                >
                                    Products
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to='cart'
                                    className="block px-4 py-2 rounded hover:bg-blue-600"

                                >
                                    MyCart
                                </Link>
                            </li>
                            <li>
                                <button

                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={handleLogout}  >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* mobile site here */}
                <aside className={`md:hidden fixed w-[40%] sm:w-[30%] bg-[#16113A] text-white flex flex-col overflow-hidden h-full ${isOpen ? 'flex flex-col translate-x-0 duration-500 transition-transform top-0 left-0 bg-[#333A56] items-center space-y-3' : '-translate-x-[400px] top-16 left-0 flex flex-col duration-500 transition-transform'}`}>
                    <div className=" py-6 px-4 text-center text-xl font-semibold border-b border-blue-600 flex flex-col">
                        <button className="flex justify-end mb-5 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <FiX size={25} /> : ''}
                        </button>
                        <Link to='/' className='font-thin bg-red-900 rounded-lg w-full  p-2  hover:scale-105 mb-2'>Back To Home</Link>
                        <Link to='' onClick={() => setIsOpen(false)} className='w-full p-2 '> User Dashboard</Link>

                    </div>
                    <nav className="flex-1 px-4 py-4">
                        <ul>
                            <li className="mb-2">
                                <Link
                                    to='profile'
                                    title='profile'
                                    className="block px-4 py-2 rounded hover:bg-blue-600" onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Profile
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to='product'
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Products
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    to='cart'
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    MyCart
                                </Link>
                            </li>
                            <li>
                                <button
                                    href="#logout"
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={handleLogout}  >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>


                {/* Main Content */}
                <div className={`flex-1 flex flex-col ml-0 md:ml-64 h-screen overflow-y-auto ${isOpen ? 'ml-56 ' : ""}`}>
                    {/* Top Navbar */}
                    <button className="m-2 md:hidden " onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? '' : <FiMenu size={25} />}
                    </button>
                    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 ml-7 md:ml-0">
                        <h1 className="text-lg font-medium ml-5 md:ml-0">Welcome,    {getUserProfile?.data?.username}</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                🔔
                            </button>
                            <Link href="" title='profile Image'>
                                <img
                                    src={`${APP_URL}/image/${getUserProfile?.data?.image}`}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border"
                                />
                            </Link>

                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 p-6">
                        <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <h3 className="text-lg font-medium mb-2" onClick={() => navigate('profile')}>Profile</h3>
                                <p className="text-sm text-gray-600">Update your personal details.</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <button className="text-lg font-medium mb-2">Settings</button>
                                <p className="text-sm text-gray-600">Manage your account settings.</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <button className="text-lg font-medium mb-2" onClick={() => navigate('report')}>Reports</button>
                                <p className="text-sm text-gray-600">View your activity reports.</p>
                            </div>
                        </div>
                    </main>

                    <div>
                        <Outlet />
                    </div>
                </div>

            </div>

        </>
    )
}

export default UserDashboar