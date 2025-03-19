import { Link, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { setMode } from "../redux/Slice/ModeRedux"
import { logout } from "../redux/Slice/AuthSlice"
import { jwtDecode } from "jwt-decode"

import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem('accessToken')
    const decode = token ? jwtDecode(token) : null;

    const darkMode = useSelector((data) => data.mode.darkMode);

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/login');
        toast.info('Logged out');
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <>
            <nav className={`fixed w-full top-0 p-4 bg-white z-50 dark:bg-black ${darkMode ? 'text-white' : ''}`}>

                {isOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 md:hidden' onClick={() => setIsOpen(false)}>

                    </div>
                )
                }
                {/* Large Screen Navbar */}
                <div className="container mx-auto flex justify-between items-center text-xl font-sans">
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-bold">
                        E-Business
                    </Link>

                    {/* Menu Button (Only visible on small screens) */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to="/" className="hover:text-indigo-400 transition duration-300">Home</NavLink>
                        <NavLink to="/about" className="hover:text-indigo-400 transition duration-300">About</NavLink>
                        <NavLink to={decode?.role === 'user' ? '/userdashboard' : '/admindashboard'} className="hover:text-indigo-400 transition duration-300">Dashboard</NavLink>

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
                        <button className="text-2xl transition duration-300" onClick={() => dispatch(setMode(!darkMode))}>
                            {darkMode ? <MdOutlineLightMode size={28} /> : <MdOutlineDarkMode size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={` md:hidden absolute top-0 z-10  bg-[#121418] p-4 min-h-screen w-[20%] ${isOpen ? " flex flex-col translate-x-0 duration-500 transition-transform top-16 left-0 bg-[#333A56] items-center space-y-3" : "-translate-x-[400px] top-16 left-0 flex flex-col duration-500 transition-transform"} `}>
                    <NavLink to="/" className="hover:text-indigo-400 transition duration-300" onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/about" className="hover:text-indigo-400 transition duration-300" onClick={() => setIsOpen(false)}>About</NavLink>
                    <NavLink to={decode?.role === 'user' ? '/userdashboard' : '/admindashboard'} className="hover:text-indigo-400 transition duration-300" onClick={() => setIsOpen(false)}>Dashboard</NavLink>

                    {!decode ? (
                        <>
                            <NavLink to="/signup" className="px-4 py-2 border border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white transition duration-300" onClick={() => setIsOpen(false)}>
                                Signup
                            </NavLink>
                            <NavLink to="/login" className="px-4 py-2 border border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white transition duration-300" onClick={() => setIsOpen(false)}>
                                Login
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/profile" className="hover:text-indigo-400 transition duration-300" onClick={() => setIsOpen(false)}>
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
                    <button className="text-2xl transition duration-300" onClick={() => dispatch(setMode(!darkMode))}>
                        {darkMode ? <MdOutlineLightMode size={28} /> : <MdOutlineDarkMode size={28} />}
                    </button>
                </div>

            </nav>
        </>
    )
}
export default Navbar