import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/Slice/AuthSlice'
import Modal from 'react-modal'
import { useResetPasswordMutation } from '../redux/Api/UserApi'


const Login = () => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
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

    const [resetPassword] = useResetPasswordMutation()

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword({ email })
            console.log("first", response)

            if (response?.data?.message) {
                navigate('/reset/otp')
                localStorage.setItem('Id', response?.data?.data?.userId)
            }
            else {
                setErrorMessage('enter a correct email')
            }

        } catch (error) {


        }
        // setIsModalOpen(false);
    };
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
                    <div className='mt-3'>
                        <a href='' onClick={(e) => { setIsModalOpen(true), e.preventDefault() }} className='font-mono text-red-700 my-1'>Forget Password ?</a>
                        <h1 className='font-serif'>Does Not Have Account ? <a href='/signup' className='font-bold hover:text-blue-500'> SignUp</a> </h1>
                    </div>
                </div>
            </div>


            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center"
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-40">
                <h2 className='text-xl font-semibold text-center mb-4'>Reset Password</h2>
                <p className='text-gray-600 text-center mb-4'>Enter your email to receive a password reset link.</p>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setErrorMessage('')
                    }
                    }
                    className='w-full mx-auto p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center'
                />
                {errorMessage && <p className='text-red-500 text-sm mt-2 text-center'>{errorMessage}</p>}
                <div className='flex justify-between mt-4'>
                    <button onClick={() => {
                        setIsModalOpen(false)
                        setErrorMessage('')
                    }} className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500'>Cancel</button>
                    <button onClick={handleSendEmail} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Send Email</button>
                </div>
            </Modal>

        </>
    )
}

export default Login