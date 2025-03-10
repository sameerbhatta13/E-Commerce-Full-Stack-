import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/Slice/AuthSlice'


const Login = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const token = localStorage.getItem('user')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!values.email || !values.password) {
            toast.error('please fill up the form')
        }
        else {
            try {
                const response = await fetch(`${APP_URL}/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    credentials: 'include',
                    body: JSON.stringify(values)

                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    toast.success('successfully logged in ')

                    const { accessToken, refreshToken } = data
                    dispatch(
                        setCredentials({ accessToken, refreshToken })
                    )
                    if (data.role == 'user') {
                        navigate('/userdashboard')

                    }
                    else {
                        navigate('/admindashboard')
                    }
                    // localStorage.setItem('accessToken', data.accessToken)
                    // localStorage.setItem('refreshToken', data.refreshToken)

                }
                else {
                    const errorData = await response.json()
                    toast.error(`${errorData.message}`)
                }


            } catch (error) {
                console.log(error)
            }
        }
    }
    // useEffect(() => {
    //     if (token) {
    //         navigate('/')
    //     }
    // }, [token])
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                            Log In
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login