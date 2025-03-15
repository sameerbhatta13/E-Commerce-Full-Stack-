import React, { useState } from 'react'
import { useGetProductQuery } from '../redux/Api/ProductApi'
import { APP_URL } from '../../config'
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const Products = () => {
    const { data: Product, isError, error } = useGetProductQuery()
    console.log("first", Product?.data?.length)

    const [currPage, setCurrPage] = useState(1)
    const itemPerPage = 6

    const totalPage = Math.ceil(Product?.data?.length / itemPerPage)
    const displayProduct = Product?.data?.slice((currPage - 1) * itemPerPage, (currPage * itemPerPage))
    return (
        <>
            <div className="relative flex flex-col w-full h-full overflow-scroll shadow-md rounded-lg bg-clip-border mt-5">

                <h1 className='text-xl font-bold text-center font-serif my-3'>Product List</h1>
                {displayProduct?.length > 0 ? (
                    <table className="w-full text-left table-auto  min-w-max border-gray-400 ">
                        <thead className='bg-slate-700 text-white'>
                            <tr>
                                <th className="p-4 border-b border-slate-300 text-white">
                                    <p className="block text-lg font-normal leading-none">
                                        S.N
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300">
                                    <p className="block text-lg font-normal leading-none ">
                                        Name
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300">
                                    <p className="block text-lg font-normal leading-none ">
                                        Image
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-non">
                                        Price
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-none ">
                                        CountInStock
                                    </p>
                                </th>
                                <th className="p-4 border-b border-slate-300 ">
                                    <p className="block text-lg font-normal leading-none ">
                                        Actions
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" bg-white hover:bg-slate-50">

                            {
                                displayProduct?.map((item, index) => {
                                    return <tr key={index}>

                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="block font-semibold text-sm text-slate-800">{index + 1}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{item.title}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <img src={`${APP_URL}/image/${item.image}`} alt="" className="w-20 h-20 object-cover rounded-md" />
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{item.price}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <p className="">{item.countInStock}</p>
                                        </td>
                                        <td className="p-4 border-b border-slate-200 py-5">
                                            <div className='flex flex-row gap-4 '>
                                                <FiEdit size={20} /> <AiFillDelete size={20} />
                                            </div>
                                        </td>

                                    </tr>

                                })
                            }



                        </tbody>


                    </table>) : (<div className='flex justify-center items-center my-9'>
                        <h1 className='font-bold text-3xl'>No Records Found</h1>
                    </div>)
                }


            </div>
            {
                displayProduct?.length > 0 ? (
                    <div className='flex justify-between items-center m-4'>
                        {
                            currPage === 1 ? <div></div> :
                                <button disabled={currPage === 1}
                                    onClick={() => setCurrPage(prev => Math.max(prev - 1, 1))}
                                    className={` bg-[#b9c956] text-white font-bold border p-3 transform transition-transform rounded-lg `}
                                >Previous</button>
                        }
                        <span className='translate-x-5 lg:translate-x-0'>page {currPage} of {totalPage}</span>

                        {
                            currPage === totalPage ? <div></div> : <button
                                disabled={currPage === totalPage}
                                onClick={() => setCurrPage(prev => Math.min(prev + 1, totalPage))}
                                className={`bg-[#608e4d] text-white font-bold   border p-3 translate-x-5 lg:translate-x-0 transform transition-transform rounded-lg ${currPage === totalPage ? `hidden` : `block`}`}
                            >
                                Next</button>
                        }

                    </div>


                ) : null

            }
        </>
    )
}

export default Products