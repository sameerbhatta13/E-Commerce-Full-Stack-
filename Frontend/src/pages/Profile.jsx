import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { useProfile } from '../customeHooks/users/useProfile'
import { useUpdateProfile } from '../customeHooks/users/useUpdateProfile'

const Profile = () => {
    const [data] = useProfile(`${APP_URL}/mydata`)
    const updateData = useUpdateProfile(`${APP_URL}/auth`)


    const [updateInfo, setUpdateInfo] = useState({
        username: '',
        email: '',
        phone: ''
    })

    const finalUpdate = {
        username: data.username || updateInfo.username,
        email: data.email || updateInfo.email,
        phone: data.phone || updateInfo.phone
    }
    // const handelChange = (e) => {
    //     const { name, value } = e.target
    //     setUpdateInfo((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }))

    // }

    const [select, setSelect] = useState(null)

    const handleUpdate = async () => {
        const updateProfile = await updateData(finalUpdate, select)
        console.log(updateProfile)
        window.location.reload()
    }


    const handleChanger = (e) => {
        setSelect(e.target.files[0])
    }

    return (
        <>
            <div className='bg-gray-100 min-h-screen p-6 font-mono'>
                <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
                    <h1 className='text-2xl text-gray-800 mb-4 underline font-bold'>User Profile</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Left Section: Profile Info */}
                        <div className='bg-white p-6 rounded-lg shadow-md'>
                            <div className='mb-4'>
                                <p className='text-gray-600 mt-2'>Username: <span className='font-semibold text-xl'>{data.username || updateInfo.username}</span></p>
                                <p className='text-gray-600 mt-2'>Email: <span className='font-semibold text-xl'>{data.email || updateInfo.email}</span></p>
                                <p className='text-gray-600 mt-2'>Phone: <span className='font-semibold text-xl'>{data.phone || updateInfo.phone}</span></p>
                                <p className='text-gray-600 mt-2'>Profile Image: <span className='font-semibold text-xl'><img src={`${APP_URL}/image/${data?.image}`} alt="" className='mt-2 w-32 h-32 rounded-full border border-gray-300' /></span></p>
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
                                <button className='bg-red-800 text-white my-5 rounded-lg w-fit p-2' onClick={handleUpdate}>Update</button>
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