import React from 'react'
import { useGetOneUserQuery } from '../redux/Api/UserApi'
import { useNavigate } from 'react-router-dom'

const UserDashboar = () => {
    const navigate = useNavigate()

    const { data: getUserProfile, error, isError } = useGetOneUserQuery()


    return (
        <>

            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-blue-800 text-white flex flex-col">
                    <div className="py-6 px-4 text-center text-xl font-semibold border-b border-blue-600">
                        User Dashboard
                    </div>
                    <nav className="flex-1 px-4 py-4">
                        <ul>
                            <li className="mb-2">
                                <a
                                    href=""
                                    className="block px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/profile')}
                                >
                                    Profile
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href=""
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => navigate('/product')}
                                >
                                    Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href=""
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => navigate('/cart')}
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
                <div className="flex-1 flex flex-col">
                    {/* Top Navbar */}
                    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
                        <h1 className="text-lg font-medium">Welcome,    {getUserProfile?.data?.username}</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                🔔
                            </button>
                            <img
                                src="https://via.placeholder.com/40"
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
                                <h3 className="text-lg font-medium mb-2" onClick={() => navigate('/profile')}>Profile</h3>
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
                </div>
            </div>
        </>
    )
}

export default UserDashboar