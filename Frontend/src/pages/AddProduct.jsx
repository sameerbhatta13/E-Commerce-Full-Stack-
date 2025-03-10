import React, { useState } from 'react'
import { useGetCategoryQuery } from '../redux/Api/CategoryApi'
import { useGetSubCategoryBySearchQuery } from '../redux/Api/SubcategoryApi'


const AddProduct = () => {
    const { data: CategoryGet } = useGetCategoryQuery()
    const [category, setCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')

    const { data: SearchSubcategory } = useGetSubCategoryBySearchQuery(category)
    // console.log(SearchSubcategory)
    return (
        <>
            <div className=' w-auto flex flex-row gap-2 p-8 mx-40 my-12'>
                <div className=' p-4'>
                    <form action="" method='POST'>
                        <h1 className=' text-4xl underline underline-offset-4 my-6'>Add New Product</h1>
                        <div className=' flex flex-row flex-wrap'>
                            <div className='basis-1/2 my-3 '>
                                <label className='text-2xl'>Product Title:</label>
                                <input type="text" placeholder='product title' name='title' className='border-2 rounded-md my-1 flex flex-col p-3 w-96' required />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Price:</label>
                                <input type="text" placeholder='product price' name='price' className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Description:</label>
                                <input type="text" placeholder='product description' name='description' className='border-2 rounded-md my-1 flex flex-col p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Category:</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} name="" id="" className='border-2 rounded-md my-1 flex flex-col  p-3 w-96'>
                                    <option value="" disabled>select category</option>
                                    {
                                        CategoryGet?.map((item) => (
                                            <option value={item._id}>{item.title}</option>
                                        ))
                                    }
                                </select>

                            </div>

                            {
                                category != '' && <div className='basis-1/2 my-3'>
                                    <label className='text-2xl'>Product Sub Category:</label>
                                    <select value={subcategory} onChange={(e) => setSubCategory(e.target.value)} name="" id="" className='border-2 rounded-md my-1 flex flex-col  p-3 w-96'>
                                        <option value="" disabled>select category</option>
                                        {
                                            SearchSubcategory?.map((item) => (
                                                <option value={item._id}>{item.title}</option>
                                            ))
                                        }
                                    </select>

                                </div>
                            }
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>CountInStock:</label>
                                <input type="text" placeholder='product stock' name='countInStock' className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
                            </div>

                        </div>
                        <button type='submit' className='bg-[#95a5a6] text-xl border rounded-lg p-3 my-4 w-48'>ADD</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AddProduct