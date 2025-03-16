import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation, useUpdatePasswordMutation } from '../redux/Api/UserApi';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')


    // console.log(password)

    const [updatePass, { isError }] = useUpdatePasswordMutation()
    const id = (localStorage.getItem('Id'))
    console.log("id", id)
    console.log("type of id", typeof id)


    const handleUpdatePassword = async (e) => {
        e.preventDefault()

        // console.log(id)
        // console.log(password)

        if (password !== confirmPassword) {
            setErrorMessage('password does not match')
        }
        else {
            try {
                const response = await updatePass({ id, data: { password } })
                console.log(password)
                console.log(response)
                // console.log("first", response)

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
                                // name='confirmpassword'
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