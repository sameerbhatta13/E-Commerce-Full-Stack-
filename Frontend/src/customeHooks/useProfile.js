import React, { useEffect, useState } from 'react'
import { APP_URL } from '../../config'

export const useProfile = (url) => {
    const token = localStorage.getItem('accessToken')
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                // credentials: "include"
                // only for cookies not needed of header
                // credentials: "include"
            })

            const data = await response.json()
            setData(data.data)

        }
        fetchProfile()
    }, [])

    return [data]
}
