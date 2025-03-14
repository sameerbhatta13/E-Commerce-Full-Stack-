import { Link, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { setMode } from "../redux/Slice/ModeRedux"
import { logout } from "../redux/Slice/AuthSlice"
import { jwtDecode } from "jwt-decode"

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = localStorage.getItem('accessToken')
    const decode = token ? jwtDecode(token) : null

    const darkMode = useSelector((data) => {
        return data.mode.darkMode
    })

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
        toast.info('logged out')
    }

    useEffect(() => {
        if (darkMode === true) {
            document.documentElement.classList.add('dark')
        }
        else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    // console.log(decode)


    return (
        <>
            <nav className="sticky top-0 bg-gray-900 shadow-md text-white p-4 z-20">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-indigo-400">
                        Ecommerce
                    </Link>

                    {/* Links */}
                    <div className="flex items-center space-x-6">
                        <NavLink to="/" className="hover:text-indigo-400 transition duration-300">Home</NavLink>
                        <NavLink to="/about" className="hover:text-indigo-400 transition duration-300">About</NavLink>

                        {/* {
                            decode?.role == 'user' ? <NavLink to="/userdashboard" className="hover:text-indigo-400 transition duration-300">Dashboard</NavLink> : <NavLink to="/admindashboard" className="hover:text-indigo-400 transition duration-300">Dashboard</NavLink>
                        } */}


                        <NavLink to={decode?.role === 'user' ? '/userdashboard' : "/admindashboard"} className="hover:text-indigo-400 transition duration-300">Dashboard</NavLink>

                        {!decode ? (
                            <>
                                <NavLink to="/signup" className="px-4 py-2 border border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white transition duration-300">
                                    Signup
                                </NavLink>
                                <NavLink to="/login" className="px-4 py-2 border border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white transition duration-300">
                                    Login
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/profile" className="hover:text-indigo-400 transition duration-300">
                                    Profile
                                </NavLink>
                                <button
                                    onClick={handleLogOut}
                                    className="px-4 py-2 border border-red-500 rounded-md text-red-400 hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {/* Dark Mode Toggle */}
                        <button
                            className="text-2xl transition duration-300"
                            onClick={() => dispatch(setMode(!darkMode))}
                        >
                            {darkMode ? <MdOutlineLightMode size={"28px"} /> : <MdOutlineDarkMode size={"28px"} />}
                        </button>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default Navbar