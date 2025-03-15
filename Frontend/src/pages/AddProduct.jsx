import React, { useState } from 'react'
import { useGetCategoryQuery } from '../redux/Api/CategoryApi'
import { useGetSubCategoryBySearchQuery } from '../redux/Api/SubcategoryApi'
import { useAddProductMutation } from '../redux/Api/ProductApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const AddProduct = () => {
    const navigate = useNavigate()
    const { data: CategoryGet } = useGetCategoryQuery()
    const [category, setCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    const [prevImg, setPrevImg] = useState(null)

    const { data: SearchSubcategory, error } = useGetSubCategoryBySearchQuery(category)
    // console.log("SearchSubcategory", SearchSubcategory, error)


    const [AddProduct, { isError }] = useAddProductMutation()
    const [productData, setProductData] = useState({
        title: '',
        image: null,
        price: '',
        description: '',
        countInStock: '',
        category: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setProductData((prev) => ({
            ...prev,
            image: file
        }))
        setPrevImg(URL.createObjectURL(file))
    }

    const handleCategoryChange = (e) => {
        const categorySelected = e.target.value
        setCategory(categorySelected)
        setProductData({
            ...productData,
            category: categorySelected,
            subCategory: ''
        }) //this will forcefully make the string id to object
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (!productData.category) {
            console.log('select category')
        }
        const formData = new FormData()
        formData.append('title', productData.title)
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        formData.append('countInStock', productData.countInStock);
        formData.append('category', productData.category);
        formData.append('subCategory', subcategory)
        if (productData.image) {
            formData.append('image', productData.image)
        }
        try {
            const response = await AddProduct(formData);
            console.log(response);
            if (response.error) {
                console.error("Error:", response.error)

            } else {
                toast.success("Product Added Successfully")
                navigate('/admindashboard/products')
            }
        } catch (error) {
            console.error("Submission Error:", error);
        }

    }




    return (
        <>
            <div className=' w-auto flex flex-row gap-2 p-8 mx-40 my-12'>
                <div className=' p-4'>
                    <form action="" onSubmit={handlesubmit} method='POST'>
                        <h1 className=' text-4xl underline underline-offset-4 my-6'>Add New Product</h1>
                        <div className=' flex flex-row flex-wrap'>
                            <div className='basis-1/2 my-3 '>
                                <label className='text-2xl'>Product Title:</label>
                                <input type="text" placeholder='product title' name='title' onChange={handleChange} className='border-2 rounded-md my-1 flex flex-col p-3 w-96' required />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Image:</label>
                                <input type="file" placeholder='product image' accept='image/*' name='image' onChange={handleImageChange} className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
                                {prevImg && (
                                    <img
                                        src={prevImg}
                                        alt="Preview"
                                        className='w-40 h-32 rounded-lg object-cover p-2 my-2'
                                    />
                                )}
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Price:</label>
                                <input type="text" placeholder='product price' name='price' onChange={handleChange} className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Description:</label>
                                <input type="text" placeholder='product description' name='description' onChange={handleChange} className='border-2 rounded-md my-1 flex flex-col p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Category:</label>
                                <select value={category} onChange={handleCategoryChange} name="category" id="" className='border-2 rounded-md my-1 flex flex-col  p-3 w-96'>
                                    <option value="" disabled>select category</option>
                                    {
                                        CategoryGet?.map((item) => (
                                            <option key={item._id} value={item._id}>{item.title}</option>
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
                                                <option key={item._id} value={item._id}>{item.title}</option>
                                            ))
                                        }
                                    </select>

                                </div>
                            }
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>CountInStock:</label>
                                <input type="text" placeholder='product stock' name='countInStock' onChange={handleChange} className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
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