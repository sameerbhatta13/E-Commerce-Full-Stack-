import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { APP_URL } from '../../config'
import { useDecreaseCartMutation, useGetCartProductQuery, useIncreaseCartMutation, useRemoveOneCartMutation, useRemovewholeCartMutation } from '../redux/Api/CartApi'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import ShippingAddress from './ShippingAddress'

const Cart = () => {
    const navigate = useNavigate()
    const [isModelOpen, setIsModelOpen] = useState(false)
    const { data: CartData, error, isError, refetch } = useGetCartProductQuery()
    // console.log(CartData)
    const cartid = CartData?.[0]?._id



    const [increaseCart, { isError: err }] = useIncreaseCartMutation()

    const [decreaseCart, { isError: isdecErr, error: decErr }] = useDecreaseCartMutation()
    // console.log(isdecErr, decErr)

    const [removeFromCart, { }] = useRemoveOneCartMutation()

    const [removeWholeCart, { }] = useRemovewholeCartMutation()


    const handlePostOrder = async (id) => {
        console.log("item id ", id)
        // const response = await postOrder(id)
        // if (response?.error) {
        //     toast.error('error in processing')
        // }
        // else {
        //     refetch()
        //     toast.success('order is placed')
        // }
    }
    const handleRemoveWholeCart = async (e) => {
        e?.preventDefault()

        try {
            const removeCart = await removeWholeCart()
            // console.log("first", removeCart)
            refetch()

        } catch (error) {

        }

    }





    const calculateTotal = () => {
        return CartData?.[0]?.products?.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    }


    const removeItemCart = async (item) => {
        const response = await removeFromCart(item.productId._id)
        if (response?.error) {
            toast.error('something went wrong', error)
        }
        else {
            refetch()
            toast.success('item removed successfully')
        }
    }

    const handleIncrease = async (item) => {
        console.log('ggg', item.productId._id)
        const response = await increaseCart(item.productId._id)
        console.log('increase errror', response)
        if (response?.error) {
            toast.error('something went wrong')
        }
        else {

            refetch();
            return toast.success('quantity increased')


        }
    }



    const handleDecrease = async (item) => {
        console.log('item id ', item.productId._id)
        const response = await decreaseCart(item.productId._id)
        console.log("decrease errror", response)
        if (response?.error) {
            toast.error('something went wrong', response.error.message)
        }
        else {
            refetch()
            return toast.success('quantity decreased')
        }


    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6 w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
                            {
                                CartData?.[0]?.products?.length > 0 ? (
                                    CartData?.[0]?.products?.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center justify-between border-b pb-4 mb-4"
                                        >
                                            <img
                                                src={`${APP_URL}/image/${item.productId.image}`}
                                                alt={item.productId.name}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <div className="flex-1 ml-4">
                                                <h2 className="font-semibold">{item.productId.title}</h2>
                                                <p className="text-gray-600">Price: Rs.{item?.productId?.price?.toFixed(2)}</p>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleDecrease(item)}
                                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleIncrease(item)}
                                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">
                                                    Rs. {(item.productId.price * item.quantity).toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() => removeItemCart(item)}
                                                    className="text-red-500 hover:underline mt-2"
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </div>
                                    ))


                                )
                                    : (
                                        <p className="text-gray-500 text-center ">Your cart is empty.</p>
                                    )}

                            {
                                CartData != 0 && <button className='text-red-500 hover:underline mt-2' onClick={handleRemoveWholeCart}>Remove All</button>
                            }
                        </div>

                        {/* Cart Summary */}
                        {
                            CartData?.length > 0 ? (
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span>Rs. {calculateTotal()?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Tax (10%)</span>
                                        <span>Rs. {(calculateTotal() * 0.1)?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>Rs. {(calculateTotal() * 1.1)?.toFixed(2)}</span>
                                    </div>
                                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={() => {
                                        handlePostOrder(cartid)
                                        setIsModelOpen(true)
                                    }}>
                                        Proceed to Checkout
                                    </button>
                                </div>) : (
                                <div>
                                    <button onClick={() => navigate('/userdashboard/product')} className="text-black text-xl mt-2 shadow-[-7px_7px_0px_#000000] text-center border-2 p-2">Go To Product</button>
                                </div>
                            )
                        }


                        <Modal isOpen={isModelOpen} onRequestClose={() => setIsModelOpen(false)}
                            overlayClassName="fixed top-0 left-0 w-full bg-black/60 h-full"
                            className='bg-gray-100 relative p-6 rounded-lg shadow-lg w-[300px] md:w-96 mt-16 mx-auto'>
                            <ShippingAddress cardData={CartData} setModal={setIsModelOpen} total={(calculateTotal() * 1.1)?.toFixed(2)} refetch={refetch} />
                        </Modal>
                    </div>
                </div>

            </div >



        </>
    )
}

export default Cart