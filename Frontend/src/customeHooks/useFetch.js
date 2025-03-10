import React, { useEffect, useState } from 'react'

export const useFetch = (url,) => {
    const [product, setProduct] = useState([])
    const [loading, setIsLoading] = useState(true)
    const [singleProduct, setSIngleProduct] = useState({})
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(url, {
                method: 'GET',
            })
            if (response.ok) {
                let data = await response.json()
                setProduct(data.data)
                setIsLoading(false)
                setSIngleProduct(data)
                setUserProfile(data.data)
            }

        }
        fetchProduct()
    }, [])
    return [product, loading, singleProduct, userProfile]
}