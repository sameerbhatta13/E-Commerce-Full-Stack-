import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetOneUserQuery } from '../redux/Api/UserApi'

const DashboardLayout = () => {
    const navigate = useNavigate()

    const { data: getUserProfile, error, isError } = useGetOneUserQuery()
    return (
        <>
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
            </div>
        </>
    )
}

export default DashboardLayout