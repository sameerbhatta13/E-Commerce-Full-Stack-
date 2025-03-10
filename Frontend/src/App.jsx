import React, { useState } from 'react'
import './App.css'
import './index.css'
import MyRoutes from '../MyRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './app/store'


function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <MyRoutes />
    </Provider>
  )
}

export default App
