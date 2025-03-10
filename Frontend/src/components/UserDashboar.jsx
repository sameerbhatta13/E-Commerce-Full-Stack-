import React from 'react'
import { useGetOneUserQuery } from '../redux/Api/UserApi'
import { Outlet, useNavigate } from 'react-router-dom'

const UserDashboar = () => {
    const navigate = useNavigate()




    return (
        <>

            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-[#16113A] text-white flex flex-col">
                    <div className="py-6 px-4 text-center text-xl font-semibold border-b border-blue-600">
                        <a href="" onClick={() => navigate('dashboardlayout')}> User Dashboard</a>
                    </div>
                    <nav className="flex-1 px-4 py-4">
                        <ul>
                            <li className="mb-2">
                                <a
                                    href=""
                                    className="block px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('profile')}
                                >
                                    Profile
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href=""
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => navigate('product')}
                                >
                                    Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href=""
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => navigate('cart')}
                                >
                                    MyCart
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#logout"
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}

                <Outlet />
            </div>
        </>
    )
}

export default UserDashboar