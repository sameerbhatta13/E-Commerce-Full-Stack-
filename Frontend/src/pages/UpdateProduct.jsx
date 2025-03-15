import React, { useEffect, useState } from 'react'
import { useUpdateProductMutation } from '../redux/Api/ProductApi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetCategoryQuery } from '../redux/Api/CategoryApi'
import { useGetSubCategoryBySearchQuery } from '../redux/Api/SubcategoryApi'
import { APP_URL } from '../../config'


const UpdateProduct = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [previewImage, setPreviewImage] = useState(null)

    const { data: CategoryGet } = useGetCategoryQuery()
    const { state } = useLocation()
    const { data: SearchSubcategory, isError, error } = useGetSubCategoryBySearchQuery(category)
    console.log('subcategory', SearchSubcategory)

    // console.log(`${APP_URL}/image/${state.image}`)f


    const [yab] = useUpdateProductMutation()

    const { id } = useParams()

    const [productData, setProductData] = useState({
        title: '',
        image: null,
        price: '',
        description: '',
        countInStock: '',
        category: ''
    })
    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        })
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setProductData({
            ...productData,
            image: file
        })
        setPreviewImage(URL.createObjectURL(file))
    }
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value
        setCategory(selectedCategory)
        setProductData({
            ...productData,
            category: selectedCategory,
            subCategory: '' //reset subcategory when category changes
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', productData.title)
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        formData.append('countInStock', productData.countInStock);
        formData.append('category', productData.category);
        formData.append('subCategory', subCategory)
        if (productData.image) {
            formData.append('image', productData.image)
        }
        try {
            const updateData = await yab({ id, data: formData })
            console.log(updateData)
            if (updateData.error) {
                console.log('error', updateData.error)
                toast.error(`error occured, ${updateData.error.data.message}`)
            }
            else {
                toast.success('product updated')
                navigate('/admindashboard/products')

            }
        } catch (error) {
            toast.error(error)

        }
    }
    useEffect(() => {
        if (state) {
            setProductData({
                title: state.title,
                image: null,
                price: state.price,
                description: state.description,
                countInStock: state.countInStock,
                category: state.category._id
            })
            setPreviewImage(`${APP_URL}/image/${state.image}`)
        }
    }, [state])
    // console.log('category', productData.category)
    return (
        <>

            <div className=' w-auto flex flex-row gap-2 p-8 mx-40 my-12'>
                <div className=' p-4'>
                    <form action="" onSubmit={handlesubmit} method='POST'>
                        <h1 className=' text-4xl underline underline-offset-4 my-6'> Update The Product:</h1>
                        <div className=' flex flex-row flex-wrap'>
                            <div className='basis-1/2 my-3 '>
                                <label className='text-2xl'>Product Title:</label>
                                <input type="text" placeholder='product title' name='title' value={productData.title}
                                    onChange={handleChange} className='border-2 rounded-md my-1 flex flex-col p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3 '>
                                <label className='text-2xl'>Product Image</label>
                                <input type="file" placeholder='product image' accept='image/*' name='image'
                                    onChange={handleImageChange} className='border-2 rounded-md my-1 flex flex-col p-3 w-96' />
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className='w-40 h-32 rounded-lg object-cover p-2 my-2'
                                    />
                                )}
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Price:</label>
                                <input type="text" placeholder='product price' name='price' onChange={handleChange} value={productData.price} className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Description:</label>
                                <input type="text" placeholder='product description' name='description' onChange={handleChange} value={productData.description} className='border-2 rounded-md my-1 flex flex-col p-3 w-96' />
                            </div>
                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Category:</label>
                                <select value={productData.category} onChange={handleCategoryChange} name="category" id="" className='border-2 rounded-md my-1 flex flex-col  p-3 w-96'>
                                    <option value="" disabled>select category</option>
                                    {(
                                        CategoryGet?.map((item) => (
                                            <option key={item._id} value={item._id}>{item.title}</option>
                                        )))
                                    }
                                </select>

                            </div>

                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>Product Sub Category:</label>
                                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} name="" id="" className='border-2 rounded-md my-1 flex flex-col  p-3 w-96'>
                                    <option value="" disabled>select category</option>
                                    {
                                        SearchSubcategory?.map((item) => (
                                            <option key={item._id} value={item._id}>{item.title}</option>
                                        ))
                                    }
                                </select>

                            </div>


                            <div className='basis-1/2 my-3'>
                                <label className='text-2xl'>CountInStock:</label>
                                <input type="text" placeholder='product stock' name='countInStock' onChange={handleChange} value={productData.countInStock} className='border-2 rounded-md my-1 flex flex-col  p-3 w-96' />
                            </div>

                        </div>
                        <button type='submit' className='bg-[#95a5a6] text-xl border rounded-lg p-3 my-4 w-48 hover:bg-red-800 hover:text-white'>update</button>
                    </form>
                </div>

            </div>

        </>

    )
}

export default UpdateProduct