import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import slide1 from '../../public/dharara.jpg';

const About = () => {
    const location = useLocation()
    console.log(location)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    })
    return (
        <>
            <div className="max-w-6xl mx-auto p-6">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
                    <p className="text-gray-600 mt-2 text-lg">
                        Discover our story and what makes us unique.
                    </p>
                </div>

                {/* About Section */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <img
                            src={slide1}
                            alt="About Us"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800">
                            Who We Are
                        </h2>
                        <p className="mt-4 text-gray-600">
                            We are a passionate team dedicated to bringing you the best online shopping experience.
                            Our platform offers high-quality products with a seamless and secure checkout process.
                        </p>
                    </div>
                </div>

                {/* Mission & Values Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center">
                        Our Mission & Values
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        We believe in quality, customer satisfaction, and innovation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold text-gray-800">Customer First</h3>
                            <p className="text-gray-600 mt-2">
                                Your satisfaction is our priority. We ensure top-notch service and support.
                            </p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold text-gray-800">Quality Products</h3>
                            <p className="text-gray-600 mt-2">
                                We source only the best products to ensure durability and performance.
                            </p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold text-gray-800">Fast & Secure</h3>
                            <p className="text-gray-600 mt-2">
                                Enjoy a seamless shopping experience with secure payments and fast delivery.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Join Us on This Journey
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Explore our collections and shop with confidence.
                    </p>
                    <a
                        href="/shop"
                        className="mt-6 inline-block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Shop Now
                    </a>
                </div>
            </div>

        </>
    )
}

export default About