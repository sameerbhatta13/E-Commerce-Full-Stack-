import React, { useState } from 'react';
import { APP_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '../redux/Api/ProductApi';
import { usePostOrderMutation } from '../redux/Api/OrderApi';

const ProductList = () => {
    const navigate = useNavigate();
    const { data: ProductGet, isLoading, refetch } = useGetProductQuery();
    const products = ProductGet?.data || [];



    const [udpateOrder, { isError }] = usePostOrderMutation()

    const handleBuyProduct = (e) => {
        e.preventDefault()

        try {

        } catch (error) {

        }
    }

    // Pagination & Search
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const itemPerPage = 4;
    const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const totalPage = Math.ceil(filteredProducts.length / itemPerPage);
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemPerPage,
        currentPage * itemPerPage
    );

    if (isLoading) {
        return <h3 className="text-center text-xl font-semibold mt-10">Loading...</h3>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Product List</h2>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full max-w-md p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                            <img
                                src={`${APP_URL}/image/${product.image}`}
                                alt={product.title}
                                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-gray-700"><b>Price:</b> Rs.{product.price}</p>
                                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                                <p className="text-green-600 font-semibold mt-2">In Stock: {product.countInStock}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => navigate(`${product._id}`, { state: product })}
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        View More
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className="text-center text-gray-600">No products available</h3>
                )}
            </div>

            <div className="flex justify-between items-center mt-8">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">Page {currentPage} of {totalPage}</span>
                <button
                    disabled={currentPage === totalPage}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPage ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
