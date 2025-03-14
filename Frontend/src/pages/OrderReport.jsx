import React, { useEffect } from 'react'
import { useGetUserOrderQuery } from '../redux/Api/OrderApi'
import { APP_URL } from '../../config'

const OrderReport = () => {
    const { data: orderList, refetch, isError } = useGetUserOrderQuery()
    console.log("first", orderList)
    // console.log('orderList', orderList?.data?.[0]?.products)
    // console.log('shipping Address', orderList?.data?.[1]?.shippingAddress)
    console.log(isError)

    useEffect(() => {
        refetch()
    }, [])
    return (
        <>
            <div className='min-h-screen ml-6 mr-1 '>

                {
                    orderList?.data?.map((item, index) => {
                        return <table key={index} className='table-auto w-[60%] border-collapse bg-gray-100 shadow-md'>
                            <thead className='border border-separate bg-slate-600 text-white  font-semibold'>
                                <tr>
                                    <td className='p-1 m-1'>SN</td>
                                    <td>Name</td>
                                    <td>Image</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                    <td>Status</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody className=''>

                                {
                                    item?.products?.map((t, index) => {
                                        return <tr key={index} className='my-2'>
                                            <td>{index + 1}</td>
                                            <td>{t?.productId?.title}</td>
                                            <td><img src={`${APP_URL}/image/${t?.productId.image}`} alt="" className="w-20 h-20 object-cover rounded-md" /></td>
                                            <td>{t?.quantity}</td>
                                            <td>{t?.productId?.price}</td>
                                            <td>{item?.status}</td>
                                            <td></td>

                                        </tr>


                                    })



                                }



                            </tbody>


                        </table >

                    })

                }

            </div >

        </>
    )
}

export default OrderReport