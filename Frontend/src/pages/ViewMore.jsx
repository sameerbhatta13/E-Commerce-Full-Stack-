import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useAddToCartMutation, useGetCartProductQuery, useRemoveOneCartMutation } from '../redux/Api/CartApi'
import { useGetOneProductQuery } from '../redux/Api/ProductApi'



const ViewMore = () => {
    // const accesstoken = localStorage.getItem('accessToken')
    // const { userId } = jwtDecode(accesstoken)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const { id } = useParams()
    // console.log(id)
    const { data: product, isLoading, error: err } = useGetOneProductQuery(id)
    // console.log('product', product)


    const [addToCart, { error }] = useAddToCartMutation()
    const [removeFromCart] = useRemoveOneCartMutation()
    const { data: cartItems, refetch } = useGetCartProductQuery()
    // console.log("cartItems", cartItems)

    const removeItemCart = async (itemId) => {
        try {
            const response = await removeFromCart(itemId)
            if (response?.error) {
                toast.error('something went wrong', error)
            }
            else {
                toast.success('item removed successfully')
                refetch()
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleAddToCart = async () => {
        try {
            const response = await addToCart({
                productId: product._id,
                quantity: 1
            })
            if (response?.error) {
                toast.error('something went wrong')
            }
            else {
                toast.success('product is added to the cart ')
                refetch()
            }
        } catch (error) {
            console.log('error updating cart data', error)
            alert("Error adding item to cart");
        }
    }
    const isInCart = cartItems?.[0]?.products?.some((item) => item.productId?._id === id)




    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])

    // const cartAdd = () => {
    //     if (!product || !product._id) {
    //         toast.error('product details is not found')
    //         return
    //     }
    //     const productToAdd = {
    //         ...product,
    //         quantity: 1

    //     }'

    //     dispatch(addToCart(productToAdd))
    //     toast.success(`${product.title} is added to the cart`)

    // }

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 m-4 md:m-32 justify-center text-justify z-20'>
                <div className=''>
                    <img
                        src={`${APP_URL}/image/${product.image}`}
                        alt="Product Image"
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg hover:scale-105 transition duration-500 ease-in"
                    />

                </div>
                <div className='  align-top'>
                    <div className=' mx-6 my-14 text-wrap inline-block z-10'>
                        <h1 className='text-2xl underline my-2 mx-2'>Metal Cars Toy Metal Wheels Die-Cast Metal Car</h1>
                        <div className='m-2'>
                            <p><b>Name Of Product:</b> {product.title}</p>
                            <p><b>Price :</b> {product.price}</p>
                            <p><b>Description :</b> {product.description}</p>
                            <p><b>On Stock :</b> {product.countInStock}</p>
                            <p><b>Reviews :</b> {product.rating}</p>
                            <p><b>Category:</b> {product.category?.title}</p>
                            <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <button className='bg-[#0cb9c7] text-xl border rounded-lg p-2 my-4'>Buy Now</button>
                                <button onClick={() => navigate(`/updateproduct/${product._id}`, {
                                    state: product
                                })} className='bg-[#95a5a6] text-xl border rounded-lg p-2 my-4'>
                                    Update Product</button>

                                {
                                    isInCart ? (<button className='bg-[#c7560c] text-xl border rounded-lg p-2 my-4' onClick={() => removeItemCart(product._id)}>Remove from cart</button>

                                    ) : (
                                        <button className='bg-[#c7560c] text-xl border rounded-lg p-2 my-4' onClick={handleAddToCart}>add to cart</button>)
                                }

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default ViewMore