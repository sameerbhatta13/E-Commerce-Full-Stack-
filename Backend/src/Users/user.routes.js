const express = require('express')
const { postUser, signIn, verify, myData, getAllUser, adminLogIn, logoutUser, RefreshToken, updateUser, forgetPassword, verifyOtp, resetPassword } = require('./user.controller')
const AUTH = require('../../middleware/authMiddleware')
const upload = require('../../middleware/uploadMiddeware')

const router = express.Router()

router.post('/register', postUser)
router.post('/signin', signIn)
router.post('/verify', verify)
router.post('/reset/email', forgetPassword)
router.post('/verifyotp', verifyOtp)
router.post('/reset/password/:id', resetPassword)
router.post('/refresh', RefreshToken)
router.get('/mydata', AUTH.authmiddleware, myData)
router.put('/auth', AUTH.authmiddleware, upload.single('image'), updateUser)
router.post('/logout/:id', AUTH.authmiddleware, logoutUser)
router.get('/alluser', AUTH.authmiddleware, AUTH.adminMiddleware, getAllUser)
router.post('/adminsignin', adminLogIn)

module.exports = router