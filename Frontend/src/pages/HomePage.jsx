import React, { useEffect } from 'react';
import { APP_URL } from '../../config';
import ProductList from '../components/ProductList';
import { useFetch } from '../customeHooks/useFetch';
import SwiperComponent from '../components/SwiperComponent';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { setMode } from '../redux/Slice/ModeRedux';


const HomePage = () => {
    // const dispatch = useDispatch()
    // const darkMode = useSelector((data) => {
    //     return data.mode.darkMode
    // })
    // console.log("darkMode", darkMode)
    // useEffect(() => {
    //     console.log('useeffect', darkMode)
    //     if (darkMode === true) {
    //         document.documentElement.classList.add('dark')
    //     }
    //     else {
    //         document.documentElement.classList.remove('dark')
    //     }
    //     localStorage.setItem('darkMode', darkMode)
    // }, [darkMode])

    return (
        <>
            {/* <div>
                <section className={`
                                 flex
                                 items-center
                                 justify-center
                                 text-2xl
                                 cursor-pointer
                                 ${darkMode ?
                        "text-richblack-100 "
                        : "text-richblack-700"}`}
                    onClick={() => {
                        dispatch(setMode(!darkMode)
                        )
                    }}>
                    {darkMode ? (
                        <MdOutlineLightMode size={"100px"} />
                    ) : (
                        <MdOutlineDarkMode size={"100px"} />)}
                </section>
            </div> */}

            <SwiperComponent />

            <ProductList />
        </>
    );
};

export default HomePage;
