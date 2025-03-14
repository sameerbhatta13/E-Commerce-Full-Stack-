
import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const SignUp = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'user',
        isvarified: false
    })
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${APP_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                await response.json()
                toast.success('user registered successfully')
                navigate('/verify')
                setFormData({ ...formData, isvarified: true })
            }
            else {
                const errorData = await response.json()
                toast.error(`Error: ${errorData.message}`);
            }

        } catch (error) {
            console.error("Network or server error:", error);
            toast.error("An error occurred while registering. Check console for details.")
        }

    }
    return (
        <>
            <div className='flex justify-center mt-12'>
                <h2 className='text-3xl font-bold text-gray-800'>Sign Up</h2>
            </div>
            <div className='flex justify-center mt-6'>
                <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="username" className='block text-lg font-medium text-gray-700'>Username</label>
                            <input
                                type="text"
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className='block text-lg font-medium text-gray-700'>Email</label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className='block text-lg font-medium text-gray-700'>Phone</label>
                            <input
                                type="tel"
                                id='phone'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className='block text-lg font-medium text-gray-700'>Password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="role" className='block text-lg font-medium text-gray-700'>Role</label>
                            <select
                                id='role'
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                                className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className='w-full p-3 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className='mt-4 text-center text-sm'>
                        Already have an account?{' '}
                        <a href="/login" className='text-blue-600 hover:text-blue-700 font-semibold'>
                            Log in here
                        </a>
                    </p>
                </div>
            </div>

        </>
    )
}

export default SignUp