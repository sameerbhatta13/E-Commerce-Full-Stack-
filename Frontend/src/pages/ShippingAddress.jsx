import React, { useState } from 'react'
import { usePostOrderMutation } from '../redux/Api/OrderApi'
import { toast } from 'react-toastify'

const ShippingAddress = ({ cardData, setModal }) => {
    console.log("cardData", cardData?.[0].products)
    const productId = cardData?.[0]?.products?.some(productId => productId._id)
    console.log(productId)

    const [shippAdd, setShippAdd] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        country: ''
    })

    let data = []
    cardData?.[0].products.map((item) => {
        data.push({ productId: item.productId._id, quantity: item.quantity })
    })

    const finalOder = {
        products: data,
        shippingAddress: shippAdd
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setShippAdd((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const [postOrder, { error }] = usePostOrderMutation()

    const handleOrder = async (e) => {
        e.preventDefault()
        try {
            const placeOrder = await postOrder(finalOder)
            console.log('order', placeOrder)
            if (placeOrder?.data?.data?.message) {
                toast.success('order placed successfully')
                setModal(false)
            }
            else {
                toast.error(placeOrder?.error?.data?.message)
            }
        } catch (error) {

        }

    }

    return (
        <>
            <div className='flex justify-center items-center m-2 p-2 flex-col '>
                <h1 className='font-bold my-2 items-start underline underline-offset-4'>Shipping Address</h1>
                <form action="" className=''>
                    <div className='flex flex-col m-2 p-2'>
                        <label htmlFor="">FullName</label>
                        <input type="text" placeholder='Enter Your Full Name' name='fullName' onChange={handleChange} className='border rounded-lg my-1 p-2' />
                        <label htmlFor="">Phone</label>
                        <input type="text" placeholder='Enter Phone Number' name='phone' onChange={handleChange} className='border rounded-lg my-1 p-2' />
                        <label htmlFor="">Address</label>
                        <input type="text" placeholder='Enter Your Address' name='address' onChange={handleChange} className='border rounded-lg my-1 p-2' />
                        <label htmlFor="">City</label>
                        <input type="text" placeholder='city' onChange={handleChange} name='city' className='border rounded-lg my-1 p-2' />
                        <label htmlFor="">Country</label>
                        <input type="text" placeholder='country' name='country' onChange={handleChange} className='border rounded-lg my-1 p-2' />

                        <button className='bg-red-600 text-white rounded-lg p-2 w-full my-2 hover:bg-green-400' onClick={handleOrder}>check Order</button>
                    </div>

                </form>
            </div>


        </>
    )
}

export default ShippingAddress