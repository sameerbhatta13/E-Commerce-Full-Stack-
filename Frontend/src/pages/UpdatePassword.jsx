import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation, useUpdatePasswordMutation } from '../redux/Api/UserApi';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [userId, setUserId] = useState(null)

    const [updatePass, { isError }] = useUpdatePasswordMutation()
    // const { userId, expiresAt } = JSON.parse(localStorage.getItem('Id'))
    // console.log("id", userId)
    // console.log("type of id", typeof userId)
    // console.log('expires at', expiresAt)



    useEffect(() => {
        const storedId = localStorage.getItem('Id')
        if (storedId) {
            const { userId, expiresAt } = JSON.parse(localStorage.getItem('Id'))
            const currentTime = new Date().getTime();

            if (currentTime > expiresAt) {

                localStorage.removeItem('Id');
                navigate('/reset/otp')
            } else {
                setUserId(userId)
            }
        } else {
            navigate('/reset/otp')
        }

    }, [navigate])



    const handleUpdatePassword = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrorMessage('password does not match')
        }
        else {
            try {
                const response = await updatePass({ id: userId, data: { password } })
                console.log(password)
                console.log(response)

                if (response?.data?.data) {
                    localStorage.removeItem('Id')
                    navigate('/login')
                }
                else {

                }
            } catch (error) {
                console.log(error)

            }

        }

    }
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Update Password</h2>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">New Password</label>
                            <input
                                type="password "
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                                name='password'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrorMessage('')
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm new password"
                                name='confirmpassword'
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setErrorMessage('')
                                }}
                                required
                            />
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdatePassword