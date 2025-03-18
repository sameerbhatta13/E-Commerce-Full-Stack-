import React, { useEffect } from 'react'
import { useGetUserOrderQuery } from '../redux/Api/OrderApi'
import { APP_URL } from '../../config'

const OrderReport = () => {
    const { data: orderList, refetch, isError } = useGetUserOrderQuery()
    // console.log("first", orderList)
    // console.log('orderList', orderList?.data?.[0]?.products)
    // console.log('shipping Address', orderList?.data?.[1]?.shippingAddress)
    // console.log(isError)

    useEffect(() => {
        refetch()
    }, [])
    return (
        <>
            <div className='min-h-screen ml-6 mr-1 '>
                <div className='relative flex flex-col w-full h-full overflow-scroll shadow-md rounded-lg bg-clip-border'>
                    {
                        orderList?.data?.map((item, index) => {
                            return <table key={index} className='table-auto w-full md:w-[60%] border-collapse bg-gray-100 shadow-md'>
                                <thead className='border border-separate bg-slate-600 text-white  font-semibold'>
                                    <tr>
                                        <th className='p-4 mx-4'>SN</th>
                                        <th className='p-4 mx-4'>Name</th>
                                        <th className='p-4 mx-4'>Image</th>
                                        <th className='p-4 mx-4'>Quantity</th>
                                        <th className='p-4 mx-4'>Price</th>
                                        <th className='p-4 mx-4'>Status</th>
                                        <th className='p-4 mx-4'>Action</th>
                                        <th className='p-4 mx-4'>Action</th>
                                        <th className='p-4 mx-4'>Action</th>
                                        <th className='p-4 mx-4'>Action</th>
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
                </div>
                {/*
                <div>
                    <h1>hello from second div</h1>
                </div> */}

            </div >

        </>
    )
}

export default OrderReport