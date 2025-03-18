import React, { useState } from 'react'
import { useGetAllUserQuery } from '../redux/Api/UserApi'
import { useGetAllOrderForAdminQuery } from '../redux/Api/OrderApi'
import { Link, Links, Outlet, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/Slice/AuthSlice';


const AdminDashboard = () => {
    const dispatch = useDispatch()
    const [showProducts, setShowProducts] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const { data: Users, isError, error } = useGetAllUserQuery()

    const { data: UserOrder, error: adminError } = useGetAllOrderForAdminQuery()

    const countUser = Users?.data?.reduce((acc, user) => {
        acc[user?.role] = (acc[user?.role] || 0) + 1;
        return acc
    }, {})
    const countOrder = UserOrder?.data?.reduce((acc, order) => {
        acc[order?.status] = (acc[order?.status] || 0) + 1
        return acc
    }, {})

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
        toast.done('logging out')
    }

    return (
        <>
            <div className=" flex h-screen overflow-auto">
                {/* Sidebar */}

                {isOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 md:hidden' onClick={() => setIsOpen(false)}>

                    </div>
                )

                }

                {/* desktop site view */}
                <div className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-6 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex md:flex-col`}>

                    <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
                    <ul>
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <Link to='/admindashboard' onClick={() => setIsOpen(false)}>Dashboard</Link>
                        </li>
                        <li className="mb-2 hover:bg-gray-700 p-2 rounded-lg">
                            <a onClick={() => setShowProducts(!showProducts)}>  Manage Product </a>
                        </li>
                        {
                            showProducts && (
                                <ul className="pl-6 space-y-2">
                                    <li className="hover:bg-gray-700 p-2 rounded-lg">
                                        <button onClick={() => { navigate('products'), setIsOpen(false) }} className="w-full text-left">Product List</button>
                                    </li>
                                    <li className="hover:bg-gray-700 p-2 rounded-lg">
                                        <button onClick={() => { navigate('addproduct'), setIsOpen(false) }} className="w-full text-left">Add Product</button>
                                    </li>
                                </ul>
                            )

                        }
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <Link to='/admin/reports'>Reports</Link>
                        </li>
                        <li className="mb-4 hover:bg-gray-700 p-2 rounded-lg">
                            <Link to='/admin/settings'>Settings</Link>
                        </li>
                        <li>
                            <button
                                className="block p-2 py-2 rounded hover:bg-blue-600"
                                onClick={handleLogout}  >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>


                {/* Main Content */}
                <div className="flex-1  p-6 bg-gray-100 overflow-auto">
                    <button className="flex justify-end mb-5 md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={25} /> : <FiMenu size={20} />}
                    </button>
                    <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-medium text-gray-700">Users</h3>
                            <p className="text-2xl font-bold text-gray-900">{countUser?.user}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{countOrder?.pending}</p>
                            <p className="text-sm text-gray-500">New orders placed today</p>
                        </div>
                    </div>
                    <div>
                        <Outlet />
                    </div>

                </div>
            </div >
        </>
    )
}

export default AdminDashboard