import React from 'react'

const AdminDashboard = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 text-white p-6">
                    <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
                    <ul>
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <a href="/admin/dashboard">Dashboard</a>
                        </li>
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <a href="/admin/users">Manage Users</a>
                        </li>
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <a href="/admin/reports">Reports</a>
                        </li>
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <a href="/admin/settings">Settings</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 bg-gray-100">
                    <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-gray-700">Users</h3>
                            <p className="text-2xl font-bold text-gray-900">1,250</p>
                            <p className="text-sm text-gray-500">Total users registered</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-gray-700">Sales</h3>
                            <p className="text-2xl font-bold text-gray-900">$34,500</p>
                            <p className="text-sm text-gray-500">Total sales this month</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-gray-700">New Orders</h3>
                            <p className="text-2xl font-bold text-gray-900">432</p>
                            <p className="text-sm text-gray-500">New orders placed today</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-medium text-gray-700 mb-4">Recent Activities</h3>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <ul>
                                <li className="border-b py-4 text-gray-700">
                                    <p><span className="font-semibold">John Doe</span> updated his profile</p>
                                    <span className="text-sm text-gray-500">2 hours ago</span>
                                </li>
                                <li className="border-b py-4 text-gray-700">
                                    <p><span className="font-semibold">Jane Smith</span> placed a new order</p>
                                    <span className="text-sm text-gray-500">3 hours ago</span>
                                </li>
                                <li className="py-4 text-gray-700">
                                    <p><span className="font-semibold">Michael Scott</span> created a new report</p>
                                    <span className="text-sm text-gray-500">1 day ago</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard