import React, { useState } from 'react'
import { useVerifyOtpMutation } from '../redux/Api/UserApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Verify = () => {
    const navigate = useNavigate()

    const [otp, setOtp] = useState('')
    console.log(otp)
    const [GetOtp, { isError, error }] = useVerifyOtpMutation()


    const verifyOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await GetOtp({ otp })
            console.log("response", response)
            if (response?.error) {
                console.log("error", response?.error)
                toast.error('something went wrong')
            }
            else {
                toast.success('otp verified')
                navigate('/login')
            }

        } catch (error) {

        }
    }

    return (
        <>

            <div className='flex flex-col items-center'>
                <h1 className='text-xl font-bold uppercase my-2'> verify the opt </h1>
                <form action="" onSubmit={verifyOtp}>
                    <input type="text" className="border p-3 rounded-md w-[100px] sm:w-[300px]  md:w-[900px]" placeholder='enter otp' onChange={(e) => setOtp(e.target.value)} />
                    <br />
                    <button className='bg-[#051ee6] w-[100px] text-white rounded-full mt-4' onClick={verifyOtp}>Send</button>
                </form>

            </div>

        </>
    )
}

export default Verify