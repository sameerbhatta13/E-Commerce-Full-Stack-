import React from 'react'
import { useDeleteProductMutation, useGetProductQuery } from '../redux/Api/ProductApi'
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { GrView } from "react-icons/gr";
import { MdLibraryAdd } from "react-icons/md";
import { APP_URL } from '../../config'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Crud = () => {
    const navigate = useNavigate()
    const { data: ProductGet, isError, isLoading, error, refetch } = useGetProductQuery()
    const product = ProductGet?.data
    const [DELETEPRODUCT] = useDeleteProductMutation()
    // console.log(product)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }
    async function deleteHandler(id) {
        const api = await DELETEPRODUCT(id)
        if (api?.error) {
            alert('Something went working')
        }
        else {
            toast.success('Product Delete Successfully.')
            refetch()
        }
    }
    return (
        <>


            <div className='min-h-screen  p-6'>
                <h1 className='text-3xl font-bold mb-6 text-center'>All the list of Product</h1>
                <div className='container mx-auto'>
                    <div className='flex flex-col'>

                        <h1 className='bg-red-300 justify-items-end p-1 mx-36 font-bold     `'><Link to='/addproduct'>Add Product<MdLibraryAdd /></Link></h1>
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='col-span-3 justify-center p-4 rounded-lg shadow-md'>
                            <table className='min-w-full table-auto'>
                                <thead>
                                    <tr className="bg-gray-800 text-white">
                                        <th className="px-4 py-2 text-left">S.N</th>
                                        <th className="px-4 py-2 text-left">Image</th>
                                        <th className="px-4 py-2 text-left">Title</th>
                                        <th className="px-4 py-2 text-left">Price</th>
                                        <th className="px-4 py-2 text-left">Description</th>
                                        <th className="px-4 py-2 text-left">Category</th>
                                        <th className="px-4 py-2 text-left">Action</th>


                                    </tr>
                                </thead>
                                {
                                    product && product.length > 0 ? (
                                        product.map((item, index) => (
                                            <tr key={item._id} className="border-b ">
                                                <td className='px-2 py-2 font-bold'>{index + 1}</td>
                                                <td className=''>
                                                    <img src={`${APP_URL}/image/${item.image}`} alt={`${item.title}`} className='w-20 h-20 object-cover rounded-md my-2' />
                                                </td>
                                                <td>{item.title}</td>
                                                <td>{item.price}</td>
                                                <td>{item.description}</td>
                                                <td>{item.category.title}</td>

                                                <td className='px-2 py-2 font-bold'>
                                                    <button className='px-2 py-2 ' data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover"><GrView /></button>
                                                    <button
                                                        onClick={() => navigate(`/updateproduct/${item._id}`, {
                                                            state: item
                                                        })}
                                                        className='px-2 py-2'>
                                                        <GrUpdate />
                                                    </button>
                                                    <button className='px-2 py-2' onClick={() => deleteHandler(item._id)}><MdDelete /></button>
                                                </td>


                                            </tr>
                                        ))
                                    ) : (
                                        <p className='text-gray-500 text-center'>your list is empty</p>
                                    )
                                }

                            </table>
                        </div>





                    </div>



                </div>


            </div >

        </>
    )
}

export default Crud