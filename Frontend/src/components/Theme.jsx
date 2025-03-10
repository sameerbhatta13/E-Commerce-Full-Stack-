import React, { useEffect } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const Theme = () => {
    const dispatch = useDispatch()
    const darkMode = useSelector((data) => {
        return data.mode.darkMode
    })

    useEffect(() => {
        if (darkMode === true) {
            document.documentElement.classList.add('dark')
        }
        else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])
    return (
        <>
            <div>
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
            </div>
        </>
    )
}

export default Theme