import React from 'react'
import { useGetOneUserQuery } from '../redux/Api/UserApi'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/Slice/AuthSlice'
import { toast } from 'react-toastify'
import { APP_URL } from '../../config'

const UserDashboar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data: getUserProfile, error, isError } = useGetOneUserQuery()
    console.log(getUserProfile?.data?.image)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
        toast.done('logging out')
    }

    return (
        <>

            <div className="flex min-h-screen bg-gray-100 ">
                {/* Sidebar */}
                <aside className="w-64 bg-[#16113A] text-white flex flex-col overflow-hidden">
                    <div className="py-6 px-4 text-center text-xl font-semibold border-b border-blue-600">
                        <a href="" onClick={() => navigate('')}> User Dashboard</a>
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
                                    onClick={handleLogout}  >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>


                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-auto">
                    {/* Top Navbar */}
                    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
                        <h1 className="text-lg font-medium">Welcome,    {getUserProfile?.data?.username}</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                🔔
                            </button>
                            <img
                                src={`${APP_URL}/image/${getUserProfile?.data?.image}`}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border"
                            />
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
                                <h3 className="text-lg font-medium mb-2">Settings</h3>
                                <p className="text-sm text-gray-600">Manage your account settings.</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <h3 className="text-lg font-medium mb-2">Reports</h3>
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