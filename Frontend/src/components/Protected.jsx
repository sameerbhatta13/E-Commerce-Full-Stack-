import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import { useRefreshTokenMutation } from '../redux/Api/UserApi';

const Protected = (props) => {
    const navigate = useNavigate()
    const { Cmp } = props;
    const reftoken = localStorage.getItem('refreshToken')
    const [AddRefresh] = useRefreshTokenMutation()
    const refreshToken = async () => {
        const api = await AddRefresh({ refreshToken: reftoken })


        try {
            if (api.data.refToken && api.data.newAccessToken) {
                console.log('refresh token called')
                localStorage.setItem('accessToken', api.data.newAccessToken)
                localStorage.setItem('refreshToken', api.data.refToken)
            }
            else {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                navigate('/login')

            }
        } catch (error) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            navigate('/login')

        }


    }




    useEffect(() => {

        const login = localStorage.getItem('accessToken');

        if (login) {
            try {
                const { exp } = jwtDecode(login);
                const currentTime = Date.now() / 1000; // Current time in seconds

                if (currentTime > exp) {
                    // localStorage.removeItem('accessToken');
                    // navigate('/login');
                    refreshToken()
                }
            } catch (error) {
                // If decoding fails, remove the invalid token and navigate to login
                console.error('Invalid token:', error.message);
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        } else {
            // No token found, navigate to login
            navigate('/login');
        }
    }, [navigate]);

    return < Cmp />

};

export default Protected
