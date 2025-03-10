import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { useProfile } from '../customeHooks/useProfile'

const Profile = () => {
    const [data] = useProfile(`${APP_URL}/mydata`)

    const [select, setSelect] = useState(null)

    const handleChanger = (e) => {
        setSelect(e.target.files[0])
    }

    return (
        <>
            <div className='bg-gray-100 min-h-screen p-6'>
                <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-4'>User Profile</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Left Section: Profile Info */}
                        <div className='bg-white p-6 rounded-lg shadow-md'>
                            <div className='mb-4'>
                                <h2 className='text-xl font-medium text-gray-700'>User Info</h2>
                                <p className='text-gray-600 mt-2'>Username: <span className='font-semibold'>{data.username}</span></p>
                                <p className='text-gray-600 mt-2'>Email: <span className='font-semibold'>{data.email}</span></p>
                                <p className='text-gray-600 mt-2'>Phone: <span className='font-semibold'>{data.phone}</span></p>
                            </div>

                            <div className='mt-6'>
                                <h3 className='text-lg font-medium text-gray-700'>Upload Profile Picture</h3>
                                <div className='mt-2'>
                                    <input
                                        type="file"
                                        onChange={handleChanger}
                                        className='block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                </div>
                                {
                                    select && (
                                        <div className='mt-4'>
                                            <p className='text-gray-600'>Preview of the uploaded image:</p>
                                            <img src={URL.createObjectURL(select)} alt="Preview" className='mt-2 w-32 h-32 rounded-full border border-gray-300' />
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Right Section: Additional Content */}
                        <div className='bg-white p-6 rounded-lg shadow-md'>
                            <h2 className='text-xl font-medium text-gray-700 mb-4'>Additional Information</h2>
                            <p className='text-gray-600'>This section can include any additional details or functionality you want to add to the profile page, such as change password, view activity logs, etc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile