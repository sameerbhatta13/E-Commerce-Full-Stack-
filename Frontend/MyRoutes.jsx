import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './src/mainlayout/MainLayout'
import HomePage from './src/pages/HomePage'

import Login from './src/pages/Login'
import About from './src/pages/About'
import UserDashboar from './src/components/UserDashboar'
import Verify from './src/pages/verify'
import Tailwind from './src/tailwindcss/Tailwind'
import Profile from './src/pages/Profile'
import ViewMore from './src/pages/ViewMore'
import Cart from './src/pages/Cart'
import UpdateProduct from './src/pages/UpdateProduct'
import Crud from './src/components/Crud'
import AddProduct from './src/pages/AddProduct'
import Protected from './src/components/Protected'
import ProductList from './src/components/ProductList'
import SignUp from './src/pages/SignUp'
import AdminDashboard from './src/components/AdminDashboard'
import DashboardLayout from './src/components/DashboardLayout'
import OrderReport from './src/pages/OrderReport'
import Products from './src/admin/Products'


const MyRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<MainLayout />} >
                        <Route path='/' element={<HomePage />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/about' element={<About />} />
                        {/* <Route path='/userdashboard' element={<Protected Cmp={UserDashboar} />} /> */}
                        <Route path='/verify' element={<Verify />} />
                        <Route path='/product/:id' element={<Protected Cmp={ViewMore} />} />
                        <Route path='/tailwind' element={<Tailwind />} />
                        <Route path='/profile' element={<Protected Cmp={Profile} />} />
                        <Route path='/cart' element={<Protected Cmp={Cart} />} />
                        {/* <Route path='/updateproduct/:id' element={<UpdateProduct />} /> */}
                        <Route path='/crud' element={<Crud />} />
                        {/* <Route path='/addproduct' element={<AddProduct />} /> */}
                        <Route path='/product' element={<ProductList />} />
                    </Route>

                    <Route path='/admindashboard' element={<Protected Cmp={AdminDashboard} />} >
                        <Route path='addproduct' element={<AddProduct />} />
                        <Route path='products' element={<Products />} />
                        <Route path='updateproduct/:id' element={<UpdateProduct />} />
                    </Route>

                    <Route path='/userdashboard' element={<Protected Cmp={UserDashboar} />} >

                        <Route path='dashboardlayout' element={<DashboardLayout />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='product' element={<ProductList />} />
                        <Route path='product/:id' element={<ViewMore />} />
                        <Route path='cart' element={<Cart />} >
                            <Route path='product' element={<ProductList />} />
                        </Route>
                        <Route path='report' element={<OrderReport />} />


                    </Route>

                </Routes>
            </Router >

        </>
    )
}

export default MyRoutes